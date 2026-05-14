mod dashboard;
mod event_type;
mod events;
mod ingest;
use axum::{
    Json, Router,
    http::StatusCode,
    routing::{get, post},
};
use std::net::SocketAddr;
use tower_http::services::{ServeDir, ServeFile};

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/ingest", post(ingest::handle_ingest))
        .route("/dashboard", get(dashboard::dashboard))
        .fallback_service(ServeDir::new("static"));
    let addr = SocketAddr::from(([0, 0, 0, 0], 3000));
    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
    println!("Hello, world!");
}
