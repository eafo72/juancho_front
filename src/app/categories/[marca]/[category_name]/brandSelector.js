"use client";

import { useRouter } from "next/navigation";

import Select from "react-select";

export const BrandSelector = ({ brand_name, category_name, allBrands }) => {
  const router = useRouter();

  const actualValue = {"value": brand_name, "label": brand_name}

  const handleBrandChange = (selectedOption) => {
    const brnd = selectedOption.value;
    router.push(`/categories/${brnd.trim().replace(/\s/g,"-")}/${category_name.trim().replace(/\s/g,"-")}`);
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
    instanceId={'marcas'}
    styles={customStyles}
    placeholder="Seleccione"
    options={allBrands}
    value={actualValue}
    onChange={handleBrandChange}
    isSearchable={true}
   ></Select>

    
  );
};
