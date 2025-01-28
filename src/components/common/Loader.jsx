import React from "react";

const Loader = () => {
  return (
    <button type="button" class="bg-green-800 ..." disabled>
      <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
      Loading…
    </button>
  );
};

export default Loader;
