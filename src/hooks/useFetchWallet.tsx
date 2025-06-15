// import { useMutation } from "@tanstack/react-query";
// import axiosInstance from "@/api/axios";

// const userWallet = async () => {
//   const response = await axiosInstance.post("/users/wallet");
//   return response.data;
// };

// const useUserWallet = () => {
//   const mutation = useMutation({
//     mutationFn: userWallet,
//     onSuccess: (data) => {
//       console.log("Wallet Fetching successfully:", data);
//     },
//     onError: (error: any) => {
//       console.error(
//         "Wallet Fetching failed:",
//         error.response?.data?.message || error.message
//       );
//     },
//   });

//   return mutation;
// };

// export default useUserWallet;



// hooks/useFetchWallet.ts
// import { useQuery } from "@tanstack/react-query";
// import axiosInstance from "@/api/axios";

// const fetchWallet = async () => {
//   const response = await axiosInstance.get("/users/wallet");
//   console.log(response.data)
//   return response.data.walletAddress;
// };

// const useFetchWallet = () => {
//   return useQuery({
//     queryKey: ["userWallet"],
//     queryFn: fetchWallet,
//   });
// };

// export default useFetchWallet;




// import axiosInstance from "@/api/axios";

// const useFetchWallet = async (): Promise<void> => {
//   const response = await axiosInstance.get("/users/wallet");
//   const wallet = response.data.walletAddress;

//   if (wallet) {
//     localStorage.setItem("walletAddress", wallet);
//   }
// };


// export default useFetchWallet;









import axiosInstance from "@/api/axios";
import { useEffect, useState } from "react";

export const fetchAndStoreWallet = async () => {
  try {
    const response = await axiosInstance.get("/users/wallet");
    const wallet = response.data.walletAddress;

    if (wallet) {
      localStorage.setItem("wallet", wallet);
    }
  } catch (error) {
    console.error("Error fetching wallet:", error);
  }
};




const useWallet = () => {
  const [wallet, setWallet] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("wallet");
    setWallet(stored);
  }, []);

  return wallet;
};

export default useWallet;

