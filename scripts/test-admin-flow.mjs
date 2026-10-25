async function testAdminFlow() {
  console.log('=== Testing Contact Submission ===');
  const contactRes = await fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Client Engineering Lead',
      email: 'lead@visioncorp.ai',
      projectType: 'Computer Vision System',
      timeline: 'ASAP (within 2 weeks)',
      description: 'Looking to deploy a real-time YOLO vehicle detection and tracking system on highway cameras.',
      source: 'GitHub',
    }),
  });
  const contactData = await contactRes.json();
  console.log('Contact Submit Status:', contactRes.status, contactData);

  console.log('\n=== Testing Admin Login ===');
  const loginRes = await fetch('http://localhost:3000/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'hafizrehman3321@gmail.com',
      password: 'AbdulInsight2026!',
    }),
  });
  const loginData = await loginRes.json();
  console.log('Login Status:', loginRes.status, loginData);

  console.log('\n=== Testing Admin Data Feed ===');
  const adminDataRes = await fetch('http://localhost:3000/api/admin/data');
  const adminData = await adminDataRes.json();
  console.log('Admin Data Stats:', adminData.stats);
  console.log('Contact Leads Count:', adminData.contactLeads?.length);
  console.log('Chat Sessions Count:', adminData.chatSessions?.length);
}

testAdminFlow();
