"use client";
import Loading from "@/components/loading/Loading";
import Statistics from "@/components/views/statistics";
import { useState, useEffect } from "react";

export default function DashboardLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Quita el loading una vez montado
  }, []);

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Loading />
        </div>
      ) : (
        <Statistics />
      )}
    </div>
  );
}
