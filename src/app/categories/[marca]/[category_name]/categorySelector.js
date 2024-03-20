"use client";

import { useRouter } from "next/navigation";

import Select from "react-select";

export const CategorySelector = ({ brand_name, category_name, allCategories }) => {
  const router = useRouter();

  const actualValue = {"value": category_name, "label": category_name}

  const handleCategoryChange = (selectedOption) => {
    const cat = selectedOption.value
    router.push(`/categories/${brand_name.trim().replace(/\s/g,"-")}/${cat.trim().replace(/\s/g,"-")}`);
  };

  
  const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "white",
      textTransform:"none",
      paddingLeft:"10px",
      borderColor: state.isFocused ? "#344493":"#cccccc",
      boxShadow: "0",
      "&:hover": {
        ...base,
        boxShadow: "0",
        borderColor: "#344493 !important",
      }
    }),
    singleValue: (base, state) => ({
      ...base,
      color: "rgb(15 23 42 / var(--tw-text-opacity))",
    }),
    multiValueRemove: (base, state) => ({
      ...base,
      color: "red",
    }),
    option: (base, state) => {
      return {
        ...base,
        background: state.isSelected ? "#344493" : state.isFocused ? "#34449350": "transparent",
        color: state.isSelected ? "white" : "grey",
      };
    },
  };

  return (
    
    <Select
      instanceId={'categorias'}
      styles={customStyles}
      placeholder="Seleccione"
      options={allCategories}
      value={actualValue}
      onChange={handleCategoryChange}
      isSearchable={true}
    ></Select>

    
  );
};
