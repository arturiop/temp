import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comments from "./Comments"

interface MediaItem {
  id: string;
  title: string;
  url: string;
  body?: string;
}

const HOST = "https://1431ffb63976.ngrok-free.app"

export default function MediaItemPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<MediaItem | null>(null);

  useEffect(() => {
    async function fetchItem() {

      const res = await fetch(
        `${HOST}/api/media_item/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      const data = await res.json();

      setItem(data);
    }
    if (id) fetchItem();
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <>
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{item.title}</h1>
      {item.body && (
        <p className="mt-4 text-gray-600">{item.body}</p>
      )}
    </div>

   {id && <Comments mediaItemUUID={id} />}
</>
  );
}