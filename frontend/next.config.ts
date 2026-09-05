import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pinuje Turbopack root na ovaj projekat. Bez ovoga Next traži lockfile
  // po nadređenim folderima i može izabrati pogrešan koren.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
