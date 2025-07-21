const supabaseUrl = "https://gjbohzyvfjjmdvbhqoma.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqYm9oenl2ZmpqbWR2Ymhxb21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0OTA1MzMsImV4cCI6MjA2NjA2NjUzM30.IHzRdh6NtXZERILB484yO2w06rBajdw8oHBPPfiopeM";
const client = supabase.createClient(supabaseUrl, supabaseKey);

// console.log(client);

let email = document.getElementById("c-email");
let password = document.getElementById("c-pass");

async function createAcc() {
  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });
  console.log(email.value);
  console.log(password.value);

  if (error) {
    console.log("error" + error.message);
  } else {
    console.log("data", data);
  }
}

async function login() {
  const { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    console.log("error" + error.message);
  } else {
    console.log(data);
    
    console.log("data", data.session.access_token);
    // window.location.href = `/dashboard.html`;
  }
}

async function checkAuth() {
  const { data:{ session} } = await client.auth.getSession();

  if (!session) {
    window.location.href = `index.html`;
  } else {
    // console.log(session);
  }
}

if (window.location.pathname != `/index.html`) {
  checkAuth();
}

async function logout() {
  const { error } = await client.auth.signOut();

  window.location.href = `index.html`;
}
