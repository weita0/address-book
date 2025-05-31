import { type Config } from "@react-router/dev/config";

export default {
  prerender: ['/about', '/microfe'],
  ssr: true,
} satisfies Config;
