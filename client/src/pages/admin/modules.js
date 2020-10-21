import React, { useMemo, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Tabla } from "components/Tabla";
import { COHORTE_BY_ID } from "apollo/querys/cohortes";
import {
  EDIT_COHORTE,
  ADD_USER_TO_COHORTE,
  DELETE_USER_TO_COHORTE,
} from "apollo/Mutations/cohortes";
import { useParams, useRouteMatch } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from  "@material-ui/core";                
import Loading from "components/Loading";
import "styles/components/CohortesDetail.scss";

import { Link } from 'react-router-dom';

function CohortesDetail({ className }) {
  let { id } = useParams();

  const [addUsersToCohorteMutation, resultCreate] = useMutation(
    ADD_USER_TO_COHORTE
  );
  const [deleteUsersToCohorteMutation, resultDelete] = useMutation(
    DELETE_USER_TO_COHORTE
  );

  const variables = { id: parseInt(id) };

  const { loading, error, data, refetch } = useQuery(COHORTE_BY_ID, {
    variables,
  });


  
  return (
    <Container style={{ paddingTop: "1rem" }}>
      {loading ? (
        <Loading />
      ) : (
        //   COMPONENTE PRINCIPAL INFO
        <Grid container spacing={2}>
          {/* TARJETA ALUMNOS */}
          <Grid item xs={12}>
            <Card variant="outlined" style={{ position: "relative" }}>
              <CardHeader title="Modulo 1" align="center"/>
              <CardContent>
                <div align="center" style={{color: 'GrayText', fontSize:'20px', marginTop:'20px'}}>
                    {
                      ['00-IntroToCS','01-JavaScriptAvanzado-I','02-JavaScriptAvanzado-II','03-EstructuraDeDatos-I','04-EstructuraDeDatos-II','05-EstructuraDeDatos-III','06-Algoritmos-I','07-Algoritmos-II'].map((e)=>(
                        <p style={{marginTop:'10px'}}> <Link to={`/admin/modules/${e}`}> {e}</Link> </p>
                      ))
                    }
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined" style={{ position: "relative" }}>
              <CardHeader title="Modulo 2" align="center"/>
              <CardContent>
                {/* <Alumns cohorte={data.cohortes[0]} loading={loading} /> */}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined" style={{ position: "relative" }}>
              <CardHeader title="Modulo 3" align="center"/>
              <CardContent>
                {/* <Alumns cohorte={data.cohortes[0]} loading={loading} /> */}
              </CardContent>
            </Card>
          </Grid>

          
          <Grid item xs={12}>
            <Card variant="outlined" style={{ position: "relative" }}>
              <CardHeader title="Modulo 4" align="center"/>
              <CardContent>
                {/* <Alumns cohorte={data.cohortes[0]} loading={loading} /> */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        
      )}
    </Container>
  );
}

export default CohortesDetail;