import {
  index,
  route,
  layout,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("layouts/sidebar.tsx", [
    index("routes/home.tsx"),
    route("contacts/:contactId", "routes/contact.tsx"),
    route("contacts/:contactId/edit", "routes/edit-contact.tsx"),
  ]),
  route("contacts/:contactId/destroy", "routes/destroy-contact.tsx"),
  // index('routes/home.tsx'),
  // route('/contacts/:contactId', 'routes/contact.tsx'),
  route("/about", "routes/about.tsx"),
  route("/h5", "routes/h5.tsx"),
  route("/worker", "routes/worker.tsx"),
  route("/calendar", "routes/calendar/index.tsx"),
  route("/microfe", "routes/microfe/index.tsx"),
  route("/sandbox", "routes/sandbox/index.tsx"),
  route("/gauge", "routes/gauge/index.tsx"),
  route("/perf", "routes/perf/index.tsx"),
  route("/performance", "routes/performance/index.tsx"),
  route("/react", "routes/react/index.tsx"),
  route("/pull-to-refresh", "routes/pull-to-refresh/index.tsx"),
  route("/arraybuffer", "routes/arraybuffer/index.tsx"),
  route('/fps', 'routes/fps/index.tsx'),
  route('/webworker', 'routes/webworker/index.tsx'),
] satisfies RouteConfig;
