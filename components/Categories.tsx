"use client";
import { AppContext } from "@/Contexts/AppContext";
import { Category } from "@/utils/Types";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
// const getCategories = async ()=>{
//     const categories =  await fetch('http://localhost:8000/api/categories/')
//     return categories.json()
// }

export default function Categories() {
  const { categories, setCategories } = useContext(AppContext);
  const [isSub, setIsSub] = useState<number>(0);
  const getCategories = async () => {
    if (categories == undefined) {
      try {
        const response = await fetch("http://localhost:8000/api/categories/");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <>
        {categories &&
          categories.map((category: Category) => {
            return (
              <div key={category.id}>
                <div className="flex justify-between pr-4">
                  <Link href={`/category/${category.id}`}>
                    <h2 key={category.id} className="hover:text-[#E73F10]">
                      {category.name}
                    </h2>
                  </Link>
                  {category.children && (
                    <>
                      {isSub == category.id ? (
                        <FaMinus
                          className="cursor-pointer mt-2"
                          onClick={() => setIsSub(0)}
                        />
                      ) : (
                        <FaPlus
                          onClick={() => setIsSub(category.id!)}
                          className="mt-2 cursor-pointer"
                        />
                      )}
                    </>
                  )}
                </div>
                <AnimatePresence>
                  <motion.div>
                    {category.children &&
                      isSub == category.id &&
                      category.children.map((subcat: Category) => {
                        return (
                            <Link key={subcat.id} href={`/category/${subcat.id}`}>
                            <motion.h2
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0, transition: { duration: 2 } }}
                                className="ml-2 hover:text-[#E73F10]"
                            >
                                {" "}
                                - {subcat.name}
                            </motion.h2>
                          </Link>
                        );
                      })}
                  </motion.div>
                </AnimatePresence>
              </div>
            );
          })}
      </>
    </div>
  );
}
