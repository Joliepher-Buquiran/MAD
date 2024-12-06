import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [name, setName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [savedData, setSavedData] = useState<any>(null);  // State to hold saved data

  const handleSave = async () => {
    try {
      const response = await fetch('http://10.0.2.2/insert.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          address: address,
          email: email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Data saved successfully!');
        // Save the entered data to display below the form
        setSavedData({
          name: name,
          address: address,
          email: email,
        });
        // Reset form inputs after saving
        setName('');
        setAddress('');
        setEmail('');
      } else {
        alert('Failed to save data!');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#a0a0a0"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
        placeholderTextColor="#a0a0a0"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#a0a0a0"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      {/* Display saved data below the Save button */}
      {savedData && (
        <View style={styles.savedDataContainer}>
          <Text style={styles.savedDataText}>Saved Information:</Text>
          <Text style={styles.savedDataDetails}>Name: {savedData.name}</Text>
          <Text style={styles.savedDataDetails}>Address: {savedData.address}</Text>
          <Text style={styles.savedDataDetails}>Email: {savedData.email}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f8ff', // Light blue background for a calm look
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#007bff', // Bright blue title
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#007bff', // Matching blue border color
    borderWidth: 1.5,
    borderRadius: 12, // Rounded corners for inputs
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#ffffff', // White background for inputs
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff', // Blue button color
    paddingVertical: 14,
    paddingHorizontal: 35,
    borderRadius: 12,
    marginTop: 10,
    elevation: 5, // Shadow effect for button
  },
  buttonText: {
    color: '#fff', // White text color for button
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  savedDataContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#ffffff', // White background for the saved data section
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd', // Subtle border for the section
    width: '100%',
  },
  savedDataText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333', // Dark color for text
    marginBottom: 10,
    textAlign: 'center',
  },
  savedDataDetails: {
    fontSize: 16,
    color: '#555', // Lighter text color for details
    marginBottom: 8,
    textAlign: 'center',
  },
});
