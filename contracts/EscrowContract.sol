pragma solidity ^0.4.15;

/*
Requirements:
  1) Post new Units on Blocklist (1 landlord - 1 unit)
  2) Prospective tenant makes an offer (escrow)
  3) Apt owner accepts or rejects the offer
  3) Receive the keys and check apt conditions
  4) Pay Unit owner -> transfer apt ownership ()
*/



contract EscrowContract {
	/* Standard state variables */
	address owner;
  uint public unit_id;
  uint public offer_id;

  /* Fallback function */
  function() {
    revert();
  }

	/* States */
  enum UnitState {
    ForRent, // Available unit
    Payed, // When the prospective tenant pays for the Unit without receiving the Unit keys
    Rented  // When tenant receives the key, updates the tenant
  }

	enum OfferState {
		Offered,
		Accepted,
		Rejected,
		Canceled
	}

	/* Structs */
	struct Unit {
    uint rooms;
    uint zip_code;
		uint rent;
    string street_address;
    string apt_room;
    string state_region;
    string country;
		address tenant;
    address landlord;
    UnitState state;
    // Pictures ? probably you dont want to store them in the blockchain ? NO pics
	}

  struct Offer {
    uint unit_id;
    address prospective_tenant;
    uint amount;
		uint timestamp;
		OfferState state;
  }

	/* Mappings */

	/* Keep track of all units */
	mapping (uint => Unit) units;

	/* Keep track of all offers of each unit
		key: unit_id
		value: offer_id[]
	 */
	mapping (uint => uint[]) unit_offers;

  /* Show each prospective tenant offers */
  mapping (uint => Offer) offers;

	/* Events */
	event UnitPosted(address landlord, uint unit); // Landlord posts Unit
  event OfferMade(address ptenant, uint offer, address landlord); // Offer sent to landlord
	event OfferRejected(address ptenant, uint offer, address landlord);
	event PaymentAccepted(address landlord); // Offer accepted
	event ChangeTranfered(address ptenant); // transfer change
	event OfferCanceled(address ptenant, uint offer, address landlord); // Tenant cancels offer
	event OfferUpdated(address ptenant, uint offer, address landlord);
	event UnitReceived(address landlord); // Keys/access code are handled to tenant

	/* Address Modifiers */
	modifier OwnerOnly() {
		require(owner == msg.sender);
		 _;
   }
	modifier landlordOnly(uint _unit_id) {
    // Is this correct ?
    require(units[_unit_id].landlord == msg.sender);
    require(msg.sender != owner);
    _;
  }

	modifier tenantOnly(uint _unit_id) {
		require(msg.sender != units[_unit_id].landlord);
    require(msg.sender != owner);
		_;
	}

	modifier offererOnly(uint _offer_id) {
		require(msg.sender == offers[_offer_id].prospective_tenant);
		_;
	}

	modifier nonZeroOffer(uint _offer_id) {
		require(offers[_offer_id].amount > 0);
		_;
	}

  /* UnitState modifiers */
  modifier forRent (uint _id) {
    require(units[_id].state == UnitState.ForRent);
    _;
  }

  modifier payed (uint _id) {
    require(units[_id].state == UnitState.Payed);
    _;
  }

  modifier rented (uint _id) {
    require(units[_id].state == UnitState.Rented);
    _;
  }

	/* OfferState modifiers */
	modifier offered (uint _offer_id) {
		require(offers[_offer_id].state == OfferState.Offered);
		_;
	}

	// These are not required
	/*modifier accepted (uint _offer_id) {
		require(offers[_offer_id].state == OfferState.Accepted);
		_;
	}

	modifier rejected (uint _offer_id) {
		require(offers[_offer_id].state == OfferState.Rejected);
		_;
	}*/

	/* Constructor function */
	function ScrowContract() {
		owner = msg.sender;
		// initialize counters
    unit_id = 0;
    offer_id = 0;
	}

  function postUnit(
    uint _rooms,
    string street_addr,
    string _apt_room,
    uint zip,
    string state,
    string _country,
    uint _rent
    ) {
      unit_id +=1;
      units[unit_id] = Unit({
        rooms: _rooms,
        street_address: street_addr,
        apt_room: _apt_room,
        zip_code: zip,
        state_region: state,
        country: _country,
        rent: _rent,
        tenant: msg.sender, // if not rented --> tenant = landlord
        landlord: msg.sender,
        state: UnitState.ForRent
      });
      UnitPosted(units[unit_id].landlord, unit_id);
  }

  function acceptOffer(uint _unit_id, uint _offer_id)
    payable
    landlordOnly(_unit_id)
    forRent(_unit_id)
		offered(_offer_id)
		nonZeroOffer(_offer_id)
  {

		uint offerAmount = offers[_offer_id].amount;
		if (units[_unit_id].rent < offerAmount) {
			uint change = offerAmount - units[_unit_id].rent;
			offers[_offer_id].amount -= change;
			offerAmount -= change;
			offers[_offer_id].prospective_tenant.transfer(change);
			ChangeTranfered(offers[_offer_id].prospective_tenant);
		}
		offers[_offer_id].amount = 0;
		units[_unit_id].landlord.transfer(offerAmount);
    units[_unit_id].tenant = offers[_offer_id].prospective_tenant;
		units[_unit_id].state = UnitState.Rented;
		offers[_offer_id].state = OfferState.Accepted;
    PaymentAccepted(offers[_offer_id].prospective_tenant);
  }

	// Timeout after 3 days or rejected by landlord
	function rejectOffer(uint _offer_id)
		payable
		landlordOnly(offers[_offer_id].unit_id)
		offered(_offer_id)
	{
		// send money back to offerer
		uint refundAmount = offers[_offer_id].amount;
		offers[_offer_id].amount = 0;
		offers[_offer_id].prospective_tenant.transfer(refundAmount);
		OfferRejected(offers[_offer_id].prospective_tenant, _offer_id, units[offers[_offer_id].unit_id].landlord);
		offers[_offer_id].state == OfferState.Rejected;
		// delete(offers[_offer_id]); // Delete offer when rejected
	}

	/* Cancel the curent offer and send back the funds to owner */
	function cancelOffer(uint _offer_id)
		payable
		offererOnly(_offer_id)
		offered(_offer_id)
	{
		msg.sender.transfer(offers[_offer_id].amount);
		offers[_offer_id].state = OfferState.Canceled;
		OfferCanceled(msg.sender, _offer_id, units[offers[_offer_id].unit_id].landlord);
	}

	function editOffer(uint _offer_id)
		payable
		offererOnly(_offer_id)
		offered(_offer_id)
	{
		// transfer the amount of funds back and update it with the new value
		uint refundAmount = offers[_offer_id].amount;
		offers[_offer_id].amount = 0;
		msg.sender.transfer(refundAmount);
		offers[_offer_id].amount = msg.value; // Does it update ?
		offers[_offer_id].timestamp = now;
		OfferUpdated(msg.sender, offer_id, units[offers[offer_id].unit_id].landlord);
	}

	/* Gamblers place their bets, preferably after calling checkOutcomes */
	function makeOffer(uint _unit_id) payable {
    offer_id +=1;
		offers[offer_id] = Offer({
				unit_id: _unit_id,
				amount: msg.value,
				prospective_tenant: msg.sender,
				timestamp: now,
				state: OfferState.Offered
		});
		unit_offers[_unit_id].push(offer_id); // append to the array of offers for the given unit
		OfferMade(msg.sender, offer_id, units[_unit_id].landlord);
	}

	/* Returns the ids of offers for a given unit */
	function checkUnitOffers(uint _unit_id)
		landlordOnly(_unit_id)
		returns (uint[])
	{
		return unit_offers[_unit_id];
	}

	function showOfferInfo(uint _offer_id) returns (address, uint) {
		return (offers[_offer_id].prospective_tenant, offers[_offer_id].amount);
	}

}
