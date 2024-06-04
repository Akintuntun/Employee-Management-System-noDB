function openDonateModal(campaignId) {
  var modal = document.getElementById("donateModal");
  document.getElementById("currentCampaignId").value = campaignId;
  modal.style.display = "block";
}

function closeDonateModal() {
  var modal = document.getElementById("donateModal");
  modal.style.display = "none";
}

function openAddCampaignModal() {
  var modal = document.getElementById("addCampaignModal");
  modal.style.display = "block";
}

function closeAddCampaignModal() {
  var modal = document.getElementById("addCampaignModal");
  modal.style.display = "none";
}

window.onclick = function (event) {
  var donateModal = document.getElementById("donateModal");
  var addCampaignModal = document.getElementById("addCampaignModal");
  if (event.target == donateModal) {
    donateModal.style.display = "none";
  }
  if (event.target == addCampaignModal) {
    addCampaignModal.style.display = "none";
  }
};

document
  .getElementById("donateForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var campaignId = document.getElementById("currentCampaignId").value;
    var donationAmount = parseInt(
      document.getElementById("donationAmount").value
    );
    var currentAmountElement = document.getElementById(
      "currentAmount-" + campaignId
    );
    var progressElement = document.getElementById("progress-" + campaignId);
    var statusElement = document.getElementById("status-" + campaignId);

    var currentAmount = parseInt(
      currentAmountElement.innerText.replace("₱", "")
    );
    var newAmount = currentAmount + donationAmount;
    currentAmountElement.innerText = "₱" + newAmount;

    var targetAmount = parseInt(
      document
        .getElementById("targetAmount-" + campaignId)
        .innerText.replace("₱", "")
    );
    var progress = Math.min(Math.round((newAmount / targetAmount) * 100), 100);
    progressElement.innerText = progress + "%";

    if (progress >= 100) {
      statusElement.innerText = "Finished";
      document.querySelector("#donate-button-" + campaignId).style.display =
        "none";
    } else {
      statusElement.innerText = "Ongoing";
    }

    closeDonateModal();
  });

document
  .getElementById("addCampaignForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var campaignName = document.getElementById("campaignName").value;
    var targetAmount = document.getElementById("targetAmount").value;

    var campaignId = Date.now();

    var tableBody = document.querySelector("#campaignTable tbody");
    var row = document.createElement("tr");
    row.innerHTML = `
    <td>${campaignName}</td>
    <td id="targetAmount-${campaignId}">₱${targetAmount}</td>
    <td id="currentAmount-${campaignId}">0</td>
    <td id="progress-${campaignId}">0%</td>
    <td id="status-${campaignId}">Ongoing</td>
    <td>
      <button class="donate-button" id="donate-button-${campaignId}" onclick="openDonateModal('${campaignId}')">Donate</button>
    </td>
  `;
    tableBody.appendChild(row);

    closeAddCampaignModal();
    document.getElementById("addCampaignForm").reset();
  });

function generateRandomName() {
  var words1 = ["Help", "Support", "Aid", "Assist", "Contribute", "Give"];
  var words2 = [
    "Community",
    "Children",
    "Education",
    "Healthcare",
    "Environment",
    "Disaster Relief",
  ];
  var randomIndex1 = Math.floor(Math.random() * words1.length);
  var randomIndex2 = Math.floor(Math.random() * words2.length);
  return words1[randomIndex1] + " " + words2[randomIndex2];
}

var tableBody = document.querySelector("#campaignTable tbody");
for (var i = 1; i <= 5; i++) {
  var campaignId = Date.now() + i;
  var row = document.createElement("tr");
  row.innerHTML = `
    <td>${generateRandomName()}</td>
    <td id="targetAmount-${campaignId}">₱${
    Math.floor(Math.random() * 1000) + 500
  }</td>
    <td id="currentAmount-${campaignId}">0</td>
    <td id="progress-${campaignId}">0%</td>
    <td id="status-${campaignId}">Ongoing</td>
    <td>
      <button class="donate-button" id="donate-button-${campaignId}" onclick="openDonateModal('${campaignId}')">Donate</button>
    </td>
  `;
  tableBody.appendChild(row);
}
