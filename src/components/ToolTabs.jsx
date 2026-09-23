import { NavLink } from 'react-router-dom';

export default function ToolTabs() {
  return (
    <div className="tab-container">
      <NavLink to="/" end className={({ isActive }) => `tab-btn${isActive ? ' active' : ''}`}>
        <iconify-icon icon="ph:image-bold" width="18"></iconify-icon>
        <span>Image Remover</span>
      </NavLink>
      <NavLink to="/video" className={({ isActive }) => `tab-btn${isActive ? ' active' : ''}`}>
        <iconify-icon icon="ph:video-bold" width="18"></iconify-icon>
        <span>Video Remover</span>
      </NavLink>
    </div>
  );
}
