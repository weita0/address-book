import { getContacts } from "../data";
import {
  Form,
  Link,
  NavLink,
  Outlet,
  useNavigation,
  useSubmit,
} from "react-router";
import type { Route } from "./+types/sidebar";
import { useEffect } from "react";

// export async function clientLoader() {
//   const contacts = await getContacts();
//   // simulate network delay
//   await new Promise((resolve) => setTimeout(resolve, 2000));
//   return { contacts };
// }

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  // simulate network delay
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return { contacts, q };
}

export default function SidebarLayout({ loaderData }: Route.ComponentProps) {
  const { contacts, q } = loaderData;
  // console.log("contacts //", contacts);
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const searchField = document.getElementById("q") as HTMLInputElement;
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);
  return (
    <>
      <div id="sidebar">
        <h1>
          <Link to="h5">React Router Contact</Link>
        </h1>
        {/* <h1>React Router Contacts</h1> */}
        <div>
          <Form
            id="search-form"
            role="search"
            onChange={(e) => {
              const isFirstSearch = q === null;
              submit(e.currentTarget, {
                // replace: !isFirstSearch
              });
            }}
          >
            <input
              defaultValue={q || ""}
              aria-label="Search contacts"
              className={searching ? "loading" : ""}
              id="q"
              name="q"
              placeholder="Search"
              type="search"
            />
            <div hidden={!searching} id="search-spinner" />
            <div aria-hidden hidden={true} id="search-spinner" />
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                    to={`contacts/${contact.id}`}
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                    {contact.favorite ? <span>★</span> : null}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        className={
          navigation.state === "loading" && !searching ? "loading" : ""
        }
        id="detail"
      >
        <Outlet />
      </div>
    </>
  );
}
