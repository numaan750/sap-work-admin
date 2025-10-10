"use client";

import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
const backendUrl = "https://sap-work-backend.vercel.app/api";

console.log(backendUrl);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(true); // 👈 true if token exists

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) {
        setToken(storedToken);
      } else {
        setToken(null);
      }
      if (storedUser && storedToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, []);


  const signup = async (username, email, password) => {
    try {
      const response = await fetch(`${backendUrl}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      console.log("Signup response:", data);

      if (data.status === "Success") {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        }
        if (data.data) {
          localStorage.setItem("user", JSON.stringify(data.data));
          setUser(data.data);
        }
        return true;
      } else {
        alert(data.message || "Signup failed");
        return false;
      }
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        setUser(data.data);
        setToken(data.token);
        return data;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  //navbar api fatch
  const getNavbar = async () => {
  try {
    const response = await fetch(`${backendUrl}/navbar`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log("Get Navbar:", data);
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    if (data && data._id) {
      return data;
    }
  } catch (error) {
    console.error("Get Navbar Error:", error);
    return null;
  }
};

  const createNavbar = async (formData) => {
    try {
      const response = await fetch(`${backendUrl}/navbar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Create Navbar:", data);
      return data;
    } catch (error) {
      console.error("Create Navbar Error:", error);
      return null;
    }
  };

  const updateNavbar = async (id, formData) => {
    try {
      const response = await fetch(`${backendUrl}/navbar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Update Navbar:", data);
      return data;
    } catch (error) {
      console.error("Update Navbar Error:", error);
      return null;
    }
  };

  const deleteNavbar = async (id) => {
    try {
      const response = await fetch(`${backendUrl}/navbar/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log("Delete Navbar:", data);
      return data;
    } catch (error) {
      console.error("Delete Navbar Error:", error);
      return null;
    }
  };

  //hero section ki apis fetch
  const gethero = async () => {
    try {
      const response = await fetch(`${backendUrl}/hero`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error("Error fetching hero:", error);
    }
  };

  const createhero = async (formData) => {
    try {
      const response = await fetch(`${backendUrl}/hero`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatehero = async (id, formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/hero/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log("Update Response:", data); // 🔍 Debug
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deletehero = async (id) => {
  try {
    const response = await fetch(`${backendUrl}/hero/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  } catch (error) {
    console.error("Error deleting hero:", error);
    return null;
  }
};

  //state api fetch

  const getstate = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/state`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json(); // ✅ correct spelling
      return data[0];
      console.log(data);
    } catch (error) {
      console.error("Error fetching hero:", error);
    }
  };

  const createstate = async (formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/state`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatestate = async (id, formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/state/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deletestate = async (id) => {
    try {
      const response = await fetch(
        `${backendUrl}/state/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // features apis fetch

  const getfeatures = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/features`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json(); // ✅ correct spelling
      return data[0];
    } catch (error) {
      console.error("Error fetching hero:", error);
    }
  };

  const createfeatures = async (formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/features`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatefeatures = async (id, formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/features/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deletefeatures = async (id) => {
    try {
      const response = await fetch(
        `${backendUrl}/features/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  //device sections ki apis fetch
  const getdevice = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/device`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json(); // ✅ correct spelling
      return data[0];
    } catch (error) {
      console.error("Error fetching device:", error);
    }
  };

  const createdevice = async (formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/device`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatedevice = async (id, formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/device/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deletedevice = async (id) => {
    try {
      const response = await fetch(
        `${backendUrl}/device/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
//comunication section ki api fetch
 const getcomunication = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/comunication`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json(); // ✅ correct spelling
      return data[0];
    } catch (error) {
      console.error("Error fetching comunication:", error);
    }
  };


  const createcomunication = async (formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/comunication`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatecomunication = async (id, formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/comunication/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deletecomunication = async (id) => {
    try {
      const response = await fetch(
        `${backendUrl}/comunication/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
//sapwork section ki api fetch
  const getsapwork = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/sapwork`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json(); 
      return data[0];
    } catch (error) {
      console.error("Error fetching sapwork:", error);
    }
  };

  const createsapwork = async (formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/sapwork`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatesapwork = async (id, formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/sapwork/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deletesapwork= async (id) => {
    try {
      const response = await fetch(
        `${backendUrl}/sapwork/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  //interface ki api fetch

  const getinterface = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/interface`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error("Error fetching interface:", error);
    }
  };

  const createinterface = async (formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/interface`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateinterface = async (id, formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/interface/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteinterface = async (id) => {
    try {
      const response = await fetch(
        `${backendUrl}/interface/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  //reviews section ki api fetch
  const getreviews = async () => {
  try {
    const response = await fetch(`${backendUrl}/reviews`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data.length ? data[0] : null;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

  const createreviews = async (formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatereviews = async (id, formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/reviews/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deletereviews = async (id) => {
    try {
      const response = await fetch(
        `${backendUrl}/reviews/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  // pricing section ki api fetch
  const getpricing = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/pricing`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json(); 
      return data[0];
    } catch (error) {
      console.error("Error fetching pricing:", error);
    }
  };

  const createpricing = async (formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/pricing`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatepricing = async (id, formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/pricing/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deletepricing = async (id) => {
    try {
      const response = await fetch(
        `${backendUrl}/pricing/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

//teams section ki api fetch

  const getteams = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/team`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const createteams = async (formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/team`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateteams = async (id, formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/team/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteteams = async (id) => {
    try {
      const response = await fetch(
        `${backendUrl}/team/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  //available section api fetch
   const getavailable = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/available`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error("Error fetching available:", error);
    }
  };

  const createavailable = async (formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/available`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateavailable = async (id, formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/available/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteavailable = async (id) => {
    try {
      const response = await fetch(
        `${backendUrl}/available/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };


  //contect us section api fetch
   const getcontectus = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/contectus`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json(); 
      return data[0];
    } catch (error) {
      console.error("Error fetching contectus:", error);
    }
  };

  const createcontectus = async (formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/contectus`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatecontectus = async (id, formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/contectus/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deletecontectus = async (id) => {
    try {
      const response = await fetch(
        `${backendUrl}/contectus/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  //footer section api fetch

     const getfooter = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/footer`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json(); 
      return data[0];
    } catch (error) {
      console.error("Error fetching footer:", error);
    }
  };

  const createfooter = async (formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/footer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatefooter = async (id, formData) => {
    try {
      const response = await fetch(
        `${backendUrl}/footer/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const deletefooter = async (id) => {
    try {
      const response = await fetch(
        `${backendUrl}/footer/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };



  // const logout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   setUser(null);
  //   setToken(null);
  // };

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        isAuthenticated,
        //navbar
        getNavbar,
        updateNavbar, deleteNavbar, createNavbar,
        //hero
        gethero,
        createhero,
        updatehero,
        deletehero,
        //state
        getstate,
        createstate,
        updatestate,
        deletestate,
        //features
        getfeatures,
        createfeatures,
        updatefeatures,
        deletefeatures,
        // // Device
        getdevice,
        createdevice,
        updatedevice,
        deletedevice,
        //comunication
        getcomunication,
        createcomunication,
        updatecomunication,
        deletecomunication,
        //sapwork
        getsapwork,
        createsapwork,
        updatesapwork,
        deletesapwork,
        //interface
        getinterface,
        createinterface,
        updateinterface,
        deleteinterface,
        //reviews
        getreviews,
        createreviews,
        updatereviews,
        deletereviews,
        //pricing
        getpricing,
        createpricing,
        updatepricing,
        deletepricing,
        //teams
        getteams,
        createteams,
        updateteams,
        deleteteams,
        //available
        getavailable,
        createavailable,
        updateavailable,
        deleteavailable,
        //contect us 
        getcontectus,
        createcontectus,
        updatecontectus,
        deletecontectus,
        //footer
        getfooter,
        createfooter,
        updatefooter,
        deletefooter
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
