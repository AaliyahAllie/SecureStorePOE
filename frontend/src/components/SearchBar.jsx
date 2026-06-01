import { useState } from "react";

export default function SearchBar({
  onSearch,
}) {
  const [query, setQuery] =
    useState("");

  return (
    <div
      style={{
        marginBottom: "1rem",
      }}
    >
      <input
        type="text"
        placeholder="Search payments..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
      />

      <button
        onClick={() =>
          onSearch(query)
        }
      >
        Search
      </button>
    </div>
  );
}