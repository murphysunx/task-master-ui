"use client";

import { observer } from "mobx-react-lite";

import { useState } from "react";

export const Header = observer(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return <header className="bg-white border-b-black border-b-2"></header>;
});
