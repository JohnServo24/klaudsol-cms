import { useState, useEffect } from "react";
import InnerLayout from "@/components/layouts/InnerLayout";
import {
  FaTruck,
  FaClock,
  FaFile,
  FaMoneyBill,
  FaList,
  FaShoppingCart,
  FaUsers,
  FaGear,
  FaMoneyCheck,
  FaCertificate
} from "react-icons/fa";
import { FiSettings } from "react-icons/fi";


export default function Plugins() {
  return (
      <InnerLayout>
        <>
        <div>
            <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-8">
                    <h3 className="mt-5"> Plugins </h3>
                   
                </div>
            </div>

           
        </div>
         
        </>
      </InnerLayout>
  );
}

