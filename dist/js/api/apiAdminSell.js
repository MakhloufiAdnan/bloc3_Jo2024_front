import { getToken, isAuthenticated, logout } from '/js/api/authUtils.js';

document.addEventListener("DOMContentLoaded", async function () {
    const sellChartCanvas = document.getElementById("sellChart");
    if (!sellChartCanvas) {
        console.warn("L'élément Canvas avec l'ID 'sellChart' est introuvable.");
        return;
    }
    const ctx = sellChartCanvas.getContext("2d");

    async function fetchSalesData() {
        // Vérifier d'abord si l'utilisateur est authentifié
        if (typeof isAuthenticated !== 'function' || !isAuthenticated()) {
            console.warn("Graphique des ventes : Utilisateur non authentifié. Le graphique ne sera pas chargé.");
            // Afficher un message à l'utilisateur sur la page, ou cacher le canvas
            sellChartCanvas.style.display = 'none';
            document.getElementById('chart-message-container').textContent = 'Veuillez vous connecter pour voir les statistiques.';
            return;
        }

        const token = typeof getToken === 'function' ? getToken() : null;
        if (!token) {
            console.warn("Graphique des ventes : Token JWT non trouvé. Le graphique ne sera pas chargé.");
            logout(); // déconnecter si le token est attendu mais absent
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        try {
            // Appel au nouvel endpoint backend pour les ventes journalières par type
            const response = await fetch("/api/admin/stats/ventes-journalieres-par-type", {
                method: "GET", 
                headers: headers
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    console.error("Graphique des ventes : Accès non autorisé ou interdit (" + response.status + "). Le token est peut-être invalide ou expiré.");
                    // Rediriger vers la page de connexion ou afficher un message
                    if (typeof logout === 'function') logout();
                }
                throw new Error(`Erreur HTTP ${response.status} lors de la récupération des données de ventes.`);
            }

            const salesDataFromBackend = await response.json(); // Doit être List<VenteParOffreDto>

            if (!salesDataFromBackend || salesDataFromBackend.length === 0) {
                console.info("Graphique des ventes : Aucune donnée de vente n'a été retournée par le backend.");
                // Afficher un message "Aucune donnée disponible" sur le graphique
                ctx.font = "16px Arial";
                ctx.textAlign = "center";
                ctx.fillText("Aucune donnée de vente disponible.", sellChartCanvas.width / 2, sellChartCanvas.height / 2);
                return;
            }
            
            // TRANSFORMATION DES DONNÉES POUR CHART.JS
            const salesByDay = {}; // Pour regrouper par jour

            salesDataFromBackend.forEach(item => {
                const day = item.date; // Le backend retourne la date comme "yyyy-MM-dd"

                if (!salesByDay[day]) {
                    salesByDay[day] = {
                        day: day, 
                        soloSales: 0,
                        duoSales: 0,
                        familySales: 0
                    };
                }

                // Les noms d'offre doivent correspondre exactement à ceux retournés par o.typeOffre.name()
                if (item.nomOffre === "SOLO") {
                    salesByDay[day].soloSales += item.nombreVentes;
                } else if (item.nomOffre === "DUO") {
                    salesByDay[day].duoSales += item.nombreVentes;
                } else if (item.nomOffre === "FAMILIALE") { 
                    salesByDay[day].familySales += item.nombreVentes;
                }
            });

            const processedSalesData = Object.values(salesByDay).sort((a, b) => {
                // Tri par date (les dates sont des chaînes "yyyy-MM-dd")
                if (a.day < b.day) return -1;
                if (a.day > b.day) return 1;
                return 0;
            });

            const labels = processedSalesData.map(sale => sale.day); 
            const soloSales = processedSalesData.map(sale => sale.nombreVentes / 1000); 
            const duoSales = processedSalesData.map(sale => sale.duoSales / 1000);
            const familySales = processedSalesData.map(sale => sale.familySales / 1000);

            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Offre Solo (en milliers)",
                            data: soloSales,
                            backgroundColor: "rgba(255, 99, 132, 0.5)", 
                            borderColor: "rgb(255, 99, 132)",
                            borderWidth: 1
                        },
                        {
                            label: "Offre Duo (en milliers)",
                            data: duoSales,
                            backgroundColor: "rgba(54, 162, 235, 0.5)",
                            borderColor: "rgb(54, 162, 235)",
                            borderWidth: 1
                        },
                        {
                            label: "Offre Famille (en milliers)",
                            data: familySales,
                            backgroundColor: "rgba(255, 205, 86, 0.5)",
                            borderColor: "rgb(255, 205, 86)",
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, 
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "Nombre de ventes (en milliers)"
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: "Date"
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Ventes Journalières par Type d\'Offre'
                        }
                    }
                }
            });

        } catch (error) {
            console.error("Erreur lors du chargement ou du traitement des données pour le graphique :", error);
            // Afficher un message d'erreur sur le canvas
            if (sellChartCanvas && ctx) {
                ctx.clearRect(0, 0, sellChartCanvas.width, sellChartCanvas.height); // Efface le canvas
                ctx.font = "16px Arial";
                ctx.fillStyle = "red";
                ctx.textAlign = "center";
                ctx.fillText("Erreur de chargement des données du graphique.", sellChartCanvas.width / 2, sellChartCanvas.height / 2);
            }
        }
    }

    // Appeler fetchSalesData seulement si l'élément canvas existe
    if (sellChartCanvas) {
        fetchSalesData();
    }
});