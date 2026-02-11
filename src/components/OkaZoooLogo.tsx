// src/components/OkaZoooLogo.tsx
import React from 'react';

const OkaZoooLogo = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="OkaZooo Logo"
  >
    {/* ゾウ本体 */}
    <ellipse cx="32" cy="36" rx="22" ry="18" fill="#FF69B4" />
    {/* 耳 */}
    <ellipse cx="14" cy="36" rx="7" ry="9" fill="#FFB6C1" />
    <ellipse cx="50" cy="36" rx="7" ry="9" fill="#FFB6C1" />
    {/* 鼻（再生ボタン） */}
    <polygon points="32,44 32,60 46,52" fill="#fff" stroke="#FF69B4" strokeWidth="2" />
    {/* 目 */}
    <circle cx="26" cy="32" r="2.5" fill="#fff" />
    <circle cx="38" cy="32" r="2.5" fill="#fff" />
    <circle cx="26" cy="32" r="1.2" fill="#333" />
    <circle cx="38" cy="32" r="1.2" fill="#333" />
    {/* 頬 */}
    <ellipse cx="22" cy="38" rx="2" ry="1.2" fill="#fff" opacity="0.5" />
    <ellipse cx="42" cy="38" rx="2" ry="1.2" fill="#fff" opacity="0.5" />
  </svg>
);

export default OkaZoooLogo;
