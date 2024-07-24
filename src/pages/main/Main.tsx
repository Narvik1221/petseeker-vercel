// @ts-nocheck
import React from "react";
import { useNavigate } from "react-router-dom";
import { PetList } from "../../widgets/petList";
import { MainContainer } from "../../shared/ui/mainContainer";
import { SearchPet } from "../../features/pet/searchPet";
import { Button } from "../../shared/ui/button";
import { ADD_PET_CARD } from "../../app/router/consts";
import { Navbar } from "../../widgets/navbar";
import { FilterPets } from "../../features/pet/filterPets";
import useGeolocation from '../../shared/hooks/useGeolocation/useGeolocation';
export const Main: React.FC = () => {
  const navigate = useNavigate();
  const { geolocation, address, error } = useGeolocation();

  if (error) {
    return <div>Error !!! {error}</div>;
  }

  if (!geolocation) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <MainContainer>
      <div>
      <h1>Current Location</h1>
      <p>Latitude: {geolocation.latitude}</p>
      <p>Longitude: {geolocation.longitude}</p>
      <p>Accuracy: {geolocation.accuracy} meters</p>

      {address && (
        <div>
          <h2>Address</h2>
          <p>Road: {address.road}</p>
          <p>City: {address.city}</p>
          <p>State: {address.state}</p>
          <p>Country: {address.country}</p>
          <p>Postal Code: {address.postalCode}</p>
        </div>
      )}
    </div>

        <SearchPet></SearchPet>

        <FilterPets></FilterPets>
        <PetList></PetList>
      </MainContainer>
      <Navbar />
    </>
  );
};
