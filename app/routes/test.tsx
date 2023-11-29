import { LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { workerProxy } from "~/worker-proxy.server";

export const loader: LoaderFunction = async ({ request }) => {
  const q = new URL(request.url).searchParams.get("q");
  let pong = "";
  if (q) {
    pong = await workerProxy.ping(q);
  }
  return { q, pong };
};

export default function Test() {
  const { q, pong } = useLoaderData<typeof loader>();

  return (
    <pre>
      <Form method="GET">
        ping to worker: <input name="q" defaultValue={q || ""} />
      </Form>
      {pong}
    </pre>
  );
}
