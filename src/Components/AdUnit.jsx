import React, { useEffect } from 'react';

export default function AdUnit() {
  useEffect(() => {
    const script = document.createElement("script");

    script.settings = {};
    script.src =
      "//rapid-university.com/b.X/VzsVdWGild0yY/W/cL/meums9/uAZnUBl/kUPtTtYF4DMsTmEx2wOxDOE/tXN_jQgTxJMZTWY_4/NfQH";
    script.async = true;
    script.referrerPolicy = "no-referrer-when-downgrade";

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
