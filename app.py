"""
Flask Application Entry Point for:
OUR FIRST ANNIVERSARY — AN INTERACTIVE DIGITAL LOVE STORY

Provides all required Flask routes using Jinja2 templates and url_for() endpoints,
custom 404 and 500 error handlers, and zero database dependencies.
"""
import os
from flask import Flask, render_template, jsonify
from config import Config
from content.anniversary_data import ANNIVERSARY_DATA, compute_anniversary_badge


def create_app() -> Flask:
    app = Flask(__name__, static_folder="static", template_folder="templates")
    app.config.from_object(Config)

    @app.context_processor
    def inject_anniversary_context():
        badge = compute_anniversary_badge()
        video_path = os.path.join(app.static_folder or "static", ANNIVERSARY_DATA["optional_video_filename"])
        audio_path = os.path.join(app.static_folder or "static", ANNIVERSARY_DATA["local_music_filename"])
        return {
            "data": ANNIVERSARY_DATA,
            "badge": badge,
            "has_personal_video": os.path.isfile(video_path),
            "has_personal_audio": os.path.isfile(audio_path),
        }

    @app.route("/", methods=["GET"])
    def index():
        """Render the welcome and main connected anniversary experience."""
        return render_template("index.html", active_page="home")

    @app.route("/story", methods=["GET"])
    def story():
        """Render the dedicated love story page."""
        return render_template("story.html", active_page="story")

    @app.route("/memories", methods=["GET"])
    def memories():
        """Render the dedicated floating memory gallery page."""
        return render_template("memories.html", active_page="memories")

    @app.route("/letter", methods=["GET"])
    def letter():
        """Render the dedicated anniversary letter page."""
        return render_template("letter.html", active_page="letter")

    @app.route("/timeline", methods=["GET"])
    def timeline():
        """Render the dedicated first year relationship timeline page."""
        return render_template("timeline.html", active_page="timeline")

    @app.route("/surprise", methods=["GET"])
    def surprise():
        """Render the dedicated interactive surprises and final anniversary reveal page."""
        return render_template("surprise.html", active_page="surprise")

    @app.route("/api/anniversary-data", methods=["GET"])
    def api_anniversary_data():
        """JSON endpoint returning the non-sensitive personalization data."""
        return jsonify({
            "data": ANNIVERSARY_DATA,
            "badge": compute_anniversary_badge(),
        })

    @app.errorhandler(404)
    def page_not_found(error):
        """Render custom romantic 404 page."""
        return render_template("404.html", active_page="404"), 404

    @app.errorhandler(500)
    def internal_server_error(error):
        """Render custom romantic 500 error page."""
        return render_template("500.html", active_page="500"), 500

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)
