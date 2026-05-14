use axum::{
    Router,
    response::Html,
    routing::{get, post},
};

use std::fs;

pub async fn dashboard() -> Html<String> {
    let html = fs::read_to_string("static/dashboard.html").unwrap();
    Html(html)
}
