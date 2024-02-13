import React, { useState } from 'react';
import axios from 'axios';

function TextractForm() {
  const [file, setFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [extractedFields, setExtractedFields] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('selectedOption', selectedOption); // Include selected option in the form data

    try {
      const response = await axios.post('http://localhost:8080/extract-fields', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setExtractedFields(response.data);
    } catch (error) {
      console.error('Error extracting fields:', error);
      alert('An error occurred while extracting fields.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Extract Fields from PDF</h1>
      <form style={{ marginBottom: '20px', textAlign: 'center' }} onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <select value={selectedOption} onChange={handleOptionChange} style={{ marginLeft: '10px' }}>
          <option value="">Select Option</option>
          <option value="PNB">PNB</option>
          <option value="Himalayan">Himalayan</option>
        </select>
        <button type="submit" style={{ marginLeft: '10px' }}>Extract Fields</button>
      </form>
      {extractedFields && (
        <div>
          <h2 style={{ textAlign: 'center' }}>Extracted Fields:</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '10px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Field</th>
                <th style={{ border: '1px solid #ddd', padding: '10px', backgroundColor: '#f2f2f2', textAlign: 'left' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(extractedFields).map(([key, value]) => (
                // Render table row only if value is not null or empty
                (value && value.trim() !== '') && (
                  <tr key={key} style={{ border: '1px solid #ddd' }}>
                    <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>{key}</td>
                    <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>{value}</td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TextractForm;
