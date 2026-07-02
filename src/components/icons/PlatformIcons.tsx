type PlatformIconProps = {
  className?: string;
  size?: number;
};

export function WindowsIcon({ className = "", size = 18 }: PlatformIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 ${className}`.trim()}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"
      />
    </svg>
  );
}

export function AppleIcon({ className = "", size = 18 }: PlatformIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 ${className}`.trim()}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
      />
    </svg>
  );
}

export function LinuxIcon({ className = "", size = 18 }: PlatformIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 ${className}`.trim()}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12.504 0c-.155 0-.315.002-.473.005-3.807.139-6.554 2.853-7.808 6.859-.898 2.879-.596 5.607.376 7.822-1.016 1.263-1.61 2.91-1.61 4.712 0 3.711 2.656 6.777 6.094 7.477.406.084.819.127 1.238.127 2.368 0 4.506-1.047 5.954-2.703-.438 1.061-.67 2.219-.67 3.434 0 1.745.606 3.352 1.616 4.629-1.134.434-2.354.662-3.626.662-2.401 0-4.602-.97-6.188-2.533-.979.141-1.988.22-3.019.22-3.483 0-6.742-1.005-9.338-2.741 2.152 4.453 6.472 7.468 11.433 7.787.387.028.776.042 1.169.042 6.627 0 12.315-4.204 14.496-10.082C22.202 6.247 17.813 0 12.504 0z"
      />
    </svg>
  );
}

export type PlatformId = "windows" | "macos" | "linux";

export const platformIcons: Record<
  PlatformId,
  ({ className, size }: PlatformIconProps) => JSX.Element
> = {
  windows: WindowsIcon,
  macos: AppleIcon,
  linux: LinuxIcon,
};
