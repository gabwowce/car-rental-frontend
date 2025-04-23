export const Automobiliai = [
    {
      automobilio_id: 1,
      marke: "Toyota",
      modelis: "Corolla",
      metai: 2020,
      numeris: "ABC123",
      vin_kodas: "JTDBU4EE9A9123456",
      spalva: "Mėlyna",
      kebulo_tipas: "Sedanas",
      pavarų_deze: "Automatinė",
      variklio_turis: 1.8,
      galia_kw: 103, 
      kuro_tipas: "Benzinas",
      rida: 52000,
      sedimos_vietos: 5,
      klimato_kontrole: true,
      navigacija: true,
      kaina_parai: 25,
      automobilio_statusas: "laisvas",
      technikines_galiojimas: "2025-08-01",
      dabartine_vieta_id: 1,
      pastabos: ""
    },
    {
      automobilio_id: 2,
      marke: "Audi",
      modelis: "A4",
      metai: 2019,
      numeris: "DEF456",
      vin_kodas: "WAUZZZ8K9AA012345",
      spalva: "Juoda",
      kebulo_tipas: "Sedanas",
      pavarų_deze: "Mechaninė",
      variklio_turis: 2.0,
      galia_kw: 110,
      kuro_tipas: "Dyzelinas",
      rida: 82000,
      sedimos_vietos: 5,
      klimato_kontrole: true,
      navigacija: false,
      kaina_parai: 30,
      automobilio_statusas: "servise",
      technikines_galiojimas: "2024-11-15",
      dabartine_vieta_id: 2,
      pastabos: "Laukiama techninės apžiūros"
    },
    {
      automobilio_id: 3,
      marke: "Volkswagen",
      modelis: "Golf",
      metai: 2021,
      numeris: "GHI789",
      vin_kodas: "WVWZZZ1KZAW012345",
      spalva: "Balta",
      kebulo_tipas: "Hečbekas",
      pavarų_deze: "Automatinė",
      variklio_turis: 1.4,
      galia_kw: 92,
      kuro_tipas: "Benzinas",
      rida: 35000,
      sedimos_vietos: 5,
      klimato_kontrole: true,
      navigacija: true,
      kaina_parai: 27,
      automobilio_statusas: "isnuomotas",
      technikines_galiojimas: "2026-01-01",
      dabartine_vieta_id: 1,
      pastabos: ""
    }
  ]
  

  export const Automobiliai2 = [
    { automobilio_id: 1, marke: "Toyota", modelis: "Corolla", automobilio_statusas: "laisvas" },
    { automobilio_id: 2, marke: "Audi", modelis: "A4", automobilio_statusas: "servise" },
    { automobilio_id: 3, marke: "VW", modelis: "Golf", automobilio_statusas: "isnuomotas" },
    { automobilio_id: 4, marke: "BMW", modelis: "320i", automobilio_statusas: "laisvas" },
  ]
  
  export const Rezervacijos = [
    {
      rezervacijos_id: 1,
      automobilis: "Toyota Corolla",
      klientas: "Jonas Kazlauskas",
      pradzia: "2025-04-24",
      pabaiga: "2025-04-26",
    },
    {
      rezervacijos_id: 2,
      automobilis: "Volkswagen Golf",
      klientas: "Laura Petrauskienė",
      pradzia: "2025-04-24",
      pabaiga: "2025-04-28",
    },
  ]
  

  export const Klientai = [
    {
      kliento_id: 1,
      vardas: "Jonas",
      pavarde: "Petrauskas",
      el_pastas: "jonas@example.com",
      telefono_nr: "+37060000001",
      gimimo_data: "1990-05-12",
      registracijos_data: "2023-06-14T10:30:00Z",
      bonus_taskai: 120,
    },
    {
      kliento_id: 2,
      vardas: "Agnė",
      pavarde: "Stankutė",
      el_pastas: "agne@example.com",
      telefono_nr: "+37060000002",
      gimimo_data: "1985-08-23",
      registracijos_data: "2023-11-20T09:15:00Z",
      bonus_taskai: 80,
    },
  ]
  

  export const Saskaitos = [
    {
      saskaitos_id: 1,
      saskaitos_nr: "INV-0001",
      klientas: "Jonas Petrauskas",
      suma: 74.00,
      saskaitos_data: "2025-04-20T10:00:00Z",
      busena: "apmokėta",
    },
    {
      saskaitos_id: 2,
      saskaitos_nr: "INV-0002",
      klientas: "Agnė Stankutė",
      suma: 125.50,
      saskaitos_data: "2025-04-21T11:45:00Z",
      busena: "vėluojanti",
    },
    {
      saskaitos_id: 3,
      saskaitos_nr: "INV-0003",
      klientas: "Darius Stankus",
      suma: 58.90,
      saskaitos_data: "2025-04-22T08:15:00Z",
      busena: "išrašyta",
    }
  ]
  

  export const Uzsakymai = [
    {
      uzsakymo_id: 1,
      klientas: "Jonas Petrauskas",
      automobilis: "Toyota Corolla",
      pradzia: "2025-04-20",
      pabaiga: "2025-04-23",
      busena: "vykdomas",
    },
    {
      uzsakymo_id: 2,
      klientas: "Agnė Stankutė",
      automobilis: "Audi A4",
      pradzia: "2025-04-15",
      pabaiga: "2025-04-18",
      busena: "užbaigtas",
    },
    {
      uzsakymo_id: 3,
      klientas: "Darius Stankus",
      automobilis: "VW Golf",
      pradzia: "2025-04-10",
      pabaiga: "2025-04-12",
      busena: "atšauktas",
    },
    {
      uzsakymo_id: 4,
      klientas: "Darius Stankus",
      automobilis: "VW Golf",
      pradzia: "2025-04-10",
      pabaiga: "2025-04-12",
      busena: "atšauktas",
    },
    {
      uzsakymo_id: 5,
      klientas: "Jonas Petrauskas",
      automobilis: "Toyota Corolla",
      pradzia: "2025-04-20",
      pabaiga: "2025-04-23",
      busena: "vykdomas",
    },
  ]
  

  export const Rezervacijos2 = [
    {
      rezervacijos_id: 1,
      klientas: "Jonas Petrauskas",
      automobilis: "Toyota Corolla",
      rezervacijos_pradzia: "2025-04-25",
      rezervacijos_pabaiga: "2025-04-27",
      busena: "patvirtinta",
    },
    {
      rezervacijos_id: 2,
      klientas: "Agnė Stankutė",
      automobilis: "VW Golf",
      rezervacijos_pradzia: "2025-04-26",
      rezervacijos_pabaiga: "2025-04-30",
      busena: "laukiama",
    },
    {
      rezervacijos_id: 3,
      klientas: "Darius Stankus",
      automobilis: "Audi A4",
      rezervacijos_pradzia: "2025-04-24",
      rezervacijos_pabaiga: "2025-04-25",
      busena: "atšaukta",
    }
  ]
  
  

  export const PagalbosUzklausos = [
    {
      uzklausos_id: 1,
      klientas: "Jonas Petrauskas",
      tema: "Automobilio atsiėmimas",
      pranesimas: "Ar galiu atsiimti anksčiau?",
      atsakymas: "Taip, galite nuo 10 val.",
      pateikimo_data: "2025-04-23T10:30:00Z",
      atsakymo_data: "2025-04-23T11:00:00Z"
    },
    {
      uzklausos_id: 2,
      klientas: "Agnė Stankutė",
      tema: "Sąskaita",
      pranesimas: "Nerandu sąskaitos sistemoje.",
      atsakymas: "",
      pateikimo_data: "2025-04-24T09:15:00Z",
      atsakymo_data: ""
    }
  ]
  