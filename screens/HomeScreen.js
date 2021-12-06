import React from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import NavOptions from '../Components/NavOptions';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../Components/NavFavourites';

const HomeScreen = () => {
	const dispatch = useDispatch();

	return (
		<SafeAreaView style={tw`bg-white h-full`}>
			<View style={tw`p-5`}>
				<Image
					style={{
						width: 100,
						height: 100,
						resizeMode: 'contain',
					}}
					source={{
						uri: 'https://links.papareact.com/gzs',
					}}
				/>
				<GooglePlacesAutocomplete
					placeholder='Where from?'
					onPress={(data, details = null) => {
						console.log(details.geometry.location);
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
							})
						);
						dispatch(setDestination(null));
					}}
					fetchDetails={true}
					onFail={(error) => console.log('error = ' + error)}
					styles={{
						container: {
							flex: 0,
						},
						textInput: {
							fontSize: 18,
						},
					}}
					enablePoweredByContainer={false}
					minLength={2}
					query={{
						key: GOOGLE_MAPS_APIKEY,
						language: 'en',
					}}
					nearbyPlacesAPI='GooglePlacesSearch'
					debounce={400}
				/>
				<NavOptions />
				<NavFavourites />
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
