import { useEffect, useState } from "react";

const useMenu = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenuData(data);
      });
  }, []);

  return menuData;
};

export default useMenu;
