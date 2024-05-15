"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <div>
      <Input
        placeholder={`Search`}
        className="max-w-xs"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
