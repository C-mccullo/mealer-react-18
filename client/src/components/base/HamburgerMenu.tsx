

const HamburgerButton = ({ onOpen, menuId, ...props }) => {
  return (
    <button
      className="rounded bg-gray-100 p-2"
      aria-haspopup={true}
      aria-controls={menuId}
    >
      <svg
        focusable={false}
        aria-hidden={true}
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  )
}