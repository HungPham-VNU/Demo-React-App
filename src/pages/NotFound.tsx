// src/pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Không tìm thấy trang</h1>
            <p className="mb-4">Trang bạn truy cập không tồn tại hoặc đã bị xóa.</p>
            <Link
                to="/"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Quay về trang chủ
            </Link>
        </div>
    );
}
