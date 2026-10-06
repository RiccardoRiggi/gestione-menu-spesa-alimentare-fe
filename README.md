# Gestione menu spesa alimentare

Gestione menu spesa alimentare è una Web Application derivata da [Otter Guardian](https://github.com/RiccardoRiggi/otter-guardian-fe) che consente di registrare le date di scadenze dei cibi della nostra dispensa. 


![Home](https://raw.githubusercontent.com/RiccardoRiggi/gestione-menu-spesa-alimentare-fe/main/screenshots/homepage.png)

Di seguito è presente la documentazione della sola componente di frontend per le funzionalità specifiche. Sul repository di [Otter Guardian](https://github.com/RiccardoRiggi/otter-guardian-fe) è disponibile la documentazione della parte derivata. [Qui](https://github.com/RiccardoRiggi/menu-spesa-alimentare-be) è disponibile la componente di backend. 

Ho deciso di pubblicare questo codice solo ora, quindi la data del repository non riflette quando l'ho effettivamente scritto. Il progetto nasce all'interno di un gestionale più grande che uso tutti i giorni per provare a semplificarmi la vita!

---

## Installazione e avvio
```sh
$ npm install
$ npm start
```

---

## Lista ingredienti

![Lista ingredienti](https://raw.githubusercontent.com/RiccardoRiggi/gestione-menu-spesa-alimentare-fe/main/screenshots/listaIngredienti.png)

In questa pagina è disponibile la lista degli ingredienti, per ogni ingrediente è indicato un prezzo che può essere inteso al chilo oppure a confezione

---

## Scheda ingrediente

![Scheda ingrediente](https://raw.githubusercontent.com/RiccardoRiggi/gestione-menu-spesa-alimentare-fe/main/screenshots/schedaIngrediente.png)

In questa pagina è possibile inserire un nuovo ingrediente

---

## Lista pietanze

![Lista pietanza](https://raw.githubusercontent.com/RiccardoRiggi/gestione-menu-spesa-alimentare-fe/main/screenshots/listaPietanze.png)

In questa pagina è possibile vedere la lista delle pietanze

---

## Scheda pietanza

![Scheda pietanza](https://raw.githubusercontent.com/RiccardoRiggi/gestione-menu-spesa-alimentare-fe/main/screenshots/schedaPietanza.png)

In questa pagina è possibile inserire una nuova pietanza e associare gli ingredienti necessari per comporla

---

## Gestione menu alimentare

![Gestione menu alimentare](https://raw.githubusercontent.com/RiccardoRiggi/gestione-menu-spesa-alimentare-fe/main/screenshots/gestioneMenuAlimentare.png)

In questa pagina è possibile comporre il menu alimentare della settimana. Sono disponibili i pasti colazione, spuntino mattutino, pranzo, spuntino pomeridiano e cena. Per ogni giorno per ogni tipo di pasto è possibile associare una o più pietanze. Inserendo una pietanza apparirà a video un report cronologico su quando è già stata inserita oppure programmata nel futuro. 


---

## Lista spese

![Lista spese](https://raw.githubusercontent.com/RiccardoRiggi/gestione-menu-spesa-alimentare-fe/main/screenshots/listaSpese.png)

In questa pagina è possibile vedere la lista delle spese

---

## Nuova lista spesa

![Nuova lista spesa](https://raw.githubusercontent.com/RiccardoRiggi/gestione-menu-spesa-alimentare-fe/main/screenshots/nuovaListaSpesa.png)

In questa pagina è possibile indicare una data di quando si andrà a fare la spesa e il range di riferimento, in questo modo verranno caricati tutti gli ingredienti delle pietanze programmate in quel determinato range di tempo. Sarà poi possibile aggiungere ciascun ingrediente


---

## Lista della spesa

![Lista della spesa](https://raw.githubusercontent.com/RiccardoRiggi/gestione-menu-spesa-alimentare-fe/main/screenshots/listaDellaSpesa.png)

In questa pagina è possibile vedere la lista della spesa, contrassegnare ogni prodotto come prelevato dallo scaffale e messo nel carrello ed eventualmente aggiornare il prezzo di riferimento in tempo reale oppure aggiungere dei prodotti presenti nel database, ma non nel range di riferimento

## Bom / Diba

* [React](https://react.dev/)
* [React Redux](https://react-redux.js.org/)
* [React Qr Code](https://github.com/rosskhanas/react-qr-code)
* [Argon Dashboard 2](https://www.creative-tim.com/product/argon-dashboard)
* [Bootstrap](https://getbootstrap.com/) 
* [FontAwesome](https://fontawesome.com/)
* [React Toastify](https://fkhadra.github.io/react-toastify/introduction)
* [Favicon](https://www.iconfinder.com/icons/8665786/otter_animal_icon)

---

## Licenza

Il codice da me scritto viene rilasciato con licenza [MIT](https://github.com/RiccardoRiggi/gestione-menu-spesa-alimentare-fe/blob/main/LICENSE). Framework, temi e librerie di terze parti mantengono le loro relative licenze. 