/**
 * Renvoie un tableau d’objets { question, answers }
 * – answers contient TOUTES les valeurs proposées (pas seulement celles sélectionnées)
 */
function getAllQuestionsAndChoices() {
    const items = [...document.querySelectorAll('div[role="listitem"]')];
    const result = [];
  
    items.forEach(item => {
      const heading = item.querySelector('div[role="heading"]');
      if (!heading) return;                          // Sécurité
  
      const question = heading.innerText.trim();
      const answers = new Set();                     // Set pour éviter les doublons
  
      /* 1. Choix multiples, cases à cocher, échelles */
      item.querySelectorAll('[role="radio"], [role="checkbox"]').forEach(el => {
        const label = el.getAttribute('aria-label') || el.dataset.value;
        if (label) answers.add(label.trim());
      });
  
      /* 2. Listes déroulantes (select) */
      item.querySelectorAll('[role="listbox"] [role="option"]').forEach(el => {
        const txt = el.innerText.trim();
        if (txt) answers.add(txt);
      });
  
      /* 3. Entrées texte – on stocke la valeur courante si elle existe,
         sinon le placeholder (utile quand le formulaire est vierge) */
      item.querySelectorAll('input[type="text"], textarea').forEach(el => {
        const val = el.value.trim() || el.placeholder?.trim();
        if (val) answers.add(val);
      });
  
      result.push({ question, answers: [...answers] });
    });
  
    console.table(result);
    return result;
  }
  
  getAllQuestionsAndChoices();
  