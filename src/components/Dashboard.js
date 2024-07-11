import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Dashboard = () => {
  const [service, setService] = useState('');
  const [externalId, setExternalId] = useState(uuidv4());
  const [serviceName, setServiceName] = useState('');
  const [roleArn, setRoleArn] = useState('');
  const [externalIdInput, setExternalIdInput] = useState('');
  const [message, setMessage] = useState('');

  const handleServiceChange = (e) => {
    setService(e.target.value);
  };

  const handleServiceNameChange = (e) => {
    setServiceName(e.target.value);
  };

  const handleRoleArnChange = (e) => {
    setRoleArn(e.target.value);
  };

  const handleExternalIdInputChange = (e) => {
    setExternalIdInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { service_name: serviceName, role_arn: roleArn, external_id: externalIdInput };
    
    try {
      const response = await fetch('http://localhost:5000/create_role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        const result = await response.json();
        setMessage('Role created successfully');
        console.log('Role created:', result);
      } else {
        setMessage('Error creating role');
      }
    } catch (error) {
      setMessage('Error creating role');
      console.error('Error:', error);
    }
  };

  const redirectToAWSRoleCreation = () => {
    const awsAccountNumber = '767398108291';
    setExternalId(uuidv4());

    const redirectUrl = `https://us-east-1.console.aws.amazon.com/iamv2/home?region=us-east-1#/roles/create?awsAccount=${awsAccountNumber}&externalId=${externalId}&policies=arn%3Aaws%3Aiam%3A%3Aaws%3Apolicy%2FReadOnlyAccess&isThirdParty=true&step=review&trustedEntityType=AWS_ACCOUNT`;

    window.open(redirectUrl, '_blank');
  };

  const redirectToroles = () => {
    const redirectUrl2 = `https://us-east-1.console.aws.amazon.com/iam/home#/roles`;
    window.open(redirectUrl2, '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="container mx-auto p-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">Create AWS Role Form</h1>
          <hr className="mb-6" />
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-700 mb-2">Choose the service</h2>
              <hr className="mb-4" />
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="aws_service"
                  name="service_type"
                  value="AWS"
                  checked={service === 'AWS'}
                  onChange={handleServiceChange}
                  className="mr-2"
                  required
                />
                <label htmlFor="aws_service" className="text-gray-700">Amazon Web Services</label>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="radio"
                  id="gcp_service"
                  name="service_type"
                  value="GCP"
                  checked={service === 'GCP'}
                  onChange={handleServiceChange}
                  className="mr-2"
                  required
                />
                <label htmlFor="gcp_service" className="text-gray-700">Google Cloud Platform</label>
              </div>
            </div>

            {service === 'AWS' && (
              <div id="aws_content" className="service-content mb-6">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-1/2 p-4">
                      <img src="assets/image1.png" alt="AWS Step 1" className="w-full rounded-lg shadow-md" />
                    </div>
                    <div className="w-1/2 p-4">
                      <h2 className="text-xl font-bold text-gray-700 mb-2">Create role</h2>
                      <hr className="mb-4" />
                      <p className="text-gray-700 mb-4">
                        <i className="fas fa-arrow-right"></i> First, open the AWS console:
                        <button
                          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          type="button"
                          onClick={redirectToAWSRoleCreation}
                        >
                          Console
                        </button>
                      </p>
                      <p className="text-gray-700 mb-4">
                        <i className="fas fa-arrow-right"></i> To create the role, verify the information we <b>pre-filled</b> for you:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li>AWS Account is selected</li>
                        <li>Another AWS Account whose ID is: 767398108291</li>
                        <li>External ID is: <span id="externalId">{externalId}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-1/2 p-4">
                      <img src="assets/image2.png" alt="AWS Step 2" className="w-full rounded-lg shadow-md" />
                    </div>
                    <div className="w-1/2 p-4">
                      <h2 className="text-xl font-bold text-gray-700 mb-2">Permissions policies</h2>
                      <hr className="mb-4" />
                      <p className="text-gray-700 mb-4">
                        <i className="fas fa-arrow-right"></i> <b>Then on the 2nd page</b>
                      </p>
                      <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li>Verify that ReadOnlyAccess is selected</li>
                      </ul>
                      <p className="text-gray-700 mb-4">
                        <i className="fas fa-arrow-right"></i> <b>On the 3rd page</b>
                      </p>
                      <ul className="list-disc list-inside text-gray-700 mb-4">
                        <li>Give a name to the role you are creating</li>
                      </ul>
                      <p className="text-gray-700 mb-4">
                        <i className="fas fa-arrow-right"></i> Finally, open the role you have created using:
                        <button
                          className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          type="button"
                          onClick={redirectToroles}
                        >
                          Roles
                        </button>
                      </p>
                      <p className="text-gray-700 mb-4">
                        <i className="fas fa-arrow-right"></i> Then Paste the ARN in the corresponding field below.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-1/2 p-4">
                      <img src="assets/image3.png" alt="AWS Step 3" className="w-full rounded-lg shadow-md" />
                    </div>
                    <div className="w-1/2 p-4">
                      <h2 className="text-xl font-bold text-gray-700 mb-2">Input</h2>
                      <hr className="mb-4" />
                      <p className="text-gray-700 mb-4">
                        <i className="fas fa-arrow-right"></i> Service account name
                        <input
                          type="text"
                          id="service_name"
                          name="service_name"
                          value={serviceName}
                          onChange={handleServiceNameChange}
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </p>
                      <p className="text-gray-700 mb-4">
                        <i className="fas fa-arrow-right"></i> Role ARN
                        <input
                          type="text"
                          id="role_arn"
                          name="role_arn"
                          value={roleArn}
                          onChange={handleRoleArnChange}
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </p>
                      <p className="text-gray-700 mb-4">
                        <i className="fas fa-arrow-right"></i> External ID
                        <input
                          type="text"
                          id="external_id_input"
                          name="external_id"
                          value={externalIdInput}
                          onChange={handleExternalIdInputChange}
                          required
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </p>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit">
                        Save and Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {service === 'GCP' && (
              <div id="gcp_content" className="service-content mb-6">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-1/2 p-4">
                      <img src="assets/image4.png" alt="GCP Step" className="w-full rounded-lg shadow-md" />
                    </div>
                    <div className="w-1/2 p-4">
                      <h2 className="text-xl font-bold text-gray-700 mb-2">Create GCP Role</h2>
                      <hr className="mb-4" />
                      <p className="text-gray-700 mb-4">
                        <i className="fas fa-arrow-right"></i> Instructions for creating GCP role go here...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
          {message && <p className="text-center mt-4 text-gray-700">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
