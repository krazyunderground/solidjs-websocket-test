import { Title } from "solid-start";
import createWebsocket from "@solid-primitives/websocket"
import { createSignal } from "solid-js"

export default function Home() {
  const [data, setData] = createSignal("");
  const [connect, disconnect, send, state] = createWebsocket(
    "ws://localhost:5000",
    (msg) => setData(msg.data),
    (msg) => setData(msg.toString()),
    [],
    5,
    5000
  );

  return (
    <main>
      <Title>Hello World</Title>
      <div>
      <b>Status:</b> {state()}
      <br />
      <b>Server Message:</b> {data()}
      <br />
      <textarea id="msg"></textarea>
      <br />
      <br />
      <button onClick={() => send(`set ${document.getElementById("msg").value}`)}>
        Set Message
      </button>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
    </div>
    </main>
  );
}
