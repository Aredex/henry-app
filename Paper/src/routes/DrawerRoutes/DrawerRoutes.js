/* eslint-disable react/prop-types */
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CohorteRoutes from "../CohorteRoutes/CohorteRoutes";
import PmRoutes from "../PmRoutes/PmRoutes";
import GruposRoutes from "../GruposRoutes/GruposRoutes";
import PerfilRoutes from "../PerfilRoutes/PerfilRoutes";
import CalendarioRoutes from "../CalendarioRoutes/CalendarioRoutes";
import DrawerLayout from "../../components/drawerLayout/DrawerLayout";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes(props) {
  const handleTheme = props.handleTheme;
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerLayout {...props} handleTheme={handleTheme} />
      )}
      initialRouteName="CohorteTab"
    >
      <Drawer.Screen name="CohorteRoutes" component={CohorteRoutes} />
      <Drawer.Screen name="GruposRoutes" component={GruposRoutes} />
      <Drawer.Screen name="PmRoutes" component={PmRoutes} />
      <Drawer.Screen name="CalendarioRoutes" component={CalendarioRoutes} />
      <Drawer.Screen name="PerfilRoutes" component={PerfilRoutes} />
      {[{id:1, title:"Grupo1"},{id:2, title:"Grupo2"}].map((e)=>(
          <Drawer.Screen name={e.title} component={PerfilRoutes} />
                ))}
    </Drawer.Navigator>
  );
}
