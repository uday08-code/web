"""
Automated test suite for the Flask backend and anniversary personalization logic.
Run with: pytest or python3 -m unittest tests/test_app.py
"""
import unittest
from datetime import date
from app import create_app
from content.anniversary_data import ANNIVERSARY_DATA, compute_anniversary_badge


class AnniversaryFlaskTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config["TESTING"] = True
        self.client = self.app.test_client()

    def test_home_route_loads(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        html = response.get_data(as_text=True)
        self.assertIn("365 DAYS OF US", html)
        self.assertIn("OPEN YOUR SURPRISE", html)
        self.assertIn("OCTOBER 20", html)

    def test_all_dedicated_routes_work(self):
        routes = ["/story", "/memories", "/letter", "/timeline", "/surprise"]
        for route in routes:
            with self.subTest(route=route):
                response = self.client.get(route)
                self.assertEqual(response.status_code, 200)

    def test_custom_404_page_renders(self):
        response = self.client.get("/non-existent-anniversary-route")
        self.assertEqual(response.status_code, 404)
        self.assertIn("404", response.get_data(as_text=True))

    def test_api_anniversary_data_endpoint(self):
        response = self.client.get("/api/anniversary-data")
        self.assertEqual(response.status_code, 200)
        payload = response.get_json()
        self.assertIn("data", payload)
        self.assertEqual(payload["data"]["anniversary_display_date"], "OCTOBER 20")

    def test_anniversary_badge_never_shows_countdown_after_october_20(self):
        after_oct_20 = date(2026, 10, 25)
        badge = compute_anniversary_badge(after_oct_20)
        self.assertEqual(badge["mode"], "celebration")
        self.assertEqual(badge["days_until"], 0)
        self.assertGreaterEqual(badge["days_since_milestone"], 370)


if __name__ == "__main__":
    unittest.main()
