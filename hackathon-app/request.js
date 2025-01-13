// Function to fetch model request data
async function fetchModelRequestFunc(variables) {
    const query = `query ModelRequestFunc($head: String!, $relation: String!) {
      modelRequestFunc(head: $head, relation: $relation) {
          tail_id
          score
          tail_label
      }
    }`;
  
    const response = await fetch('http://localhost:8686/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
  
    const result = await response.json();
    return result.data.modelRequestFunc;
  }
  
  // Example usage:
  (async () => {
    try {
      const result = await fetchModelRequestFunc({
        head: "http://purl.obolibrary.org/obo/DOID_13099",
        relation: "Parents",
      });
      console.log(result);
    } catch (error) {
      console.error('Error fetching model request:', error);
    }
  })();