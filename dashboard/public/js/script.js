// public/js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const loadData = async (url, targetId) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const targetElement = document.getElementById(targetId);
  
        if (targetElement && data) {
          data.forEach(item => {
            const card = createCard(item);
            targetElement.appendChild(card);
          });
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
  
    const createCard = (data) => {
      const card = document.createElement('div');
      card.className = 'card';
  
      for (const key in data) {
        const value = key === 'safe' ? (data[key] ? 'Safe' : 'Unsafe') : data[key];
        card.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
      }
  
      return card;
    };
  
    loadData('/gas', 'gasData');
    loadData('/patient', 'patientData');
    loadData('/electrical', 'electricalData');
  });
  