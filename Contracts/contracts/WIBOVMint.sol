// contracts/GEHRContract.sol
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16;

import "./IGEHRToken.sol";
import "./GEHRToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract GEHR is ERC721, Ownable {
    string constant TOKEN_NAME = "Global Eletronic Health Record";
    string constant TOKEN_SYMBOL = "GEHR";
    uint256 constant TOKEN_COST = 1000000000000000000;

    struct Info {
        uint64 infoType;
        string data;
    }

    struct Record {
        uint256 patientToken;
        uint64 recordType;
        address operatorAddr;
        string operatorInfo;
        uint64 addedAt;
        uint64 agendaAt;
        string data;
        bool visible;
    }

    struct Patient {
        string name;
        string email;
        uint64 birthday;
        uint64 addedAt;
        uint64 lastChange;
        uint64 tags;
        bool visible;
    }

    uint256 private _totalSupply = 0;

    Patient[] private _allPatients;
    Record[] private _allRecords;
    mapping(uint256 => mapping(uint256 => uint256)) private _patientRecords;
    mapping(uint256 => uint256) private _patientRecordsIndex;

    mapping(address => mapping(uint256 => uint256)) private _recordsByOperator;
    mapping(address => uint256) private _recordsByOperatorIndex;

    mapping(address => uint256) private _patientByToken;
    mapping(address => mapping(address => bool)) private _patientApprovals;
    mapping(address => mapping(uint256 => address)) private _operatorApprovals;
    mapping(address => uint256) private _operatorApprovalsIndex;

    address internal _erc20Address;
    IGEHRToken internal _gehrToken;

    constructor() ERC721("Global Eletronic Health Record", "GEHR") {
        _allPatients.push(Patient({
            name: "",
            email: "",
            birthday: 0,
            addedAt: 0,
            lastChange: 0,
            tags: 0,
            visible: false
        }));
        _allRecords.push(Record({
            patientToken: 0,
            recordType: 0,
            operatorAddr: address(0),
            operatorInfo: "",
            addedAt: 0,
            agendaAt: 0,
            data: "",
            visible: false
        }));
    }

    function erc20Contract() public view returns (address) {
        return _erc20Address;
    }

    function setErc20Contract(address _address) public onlyOwner {
        _erc20Address = _address;
        IGEHRToken gehrToken = IGEHRToken(_erc20Address);
        require(gehrToken.isGEHRToken(), "GEHR: GEHR Token is not valid");
        _gehrToken = IGEHRToken(_address);
    }

    // modifiers

    modifier onlyApproved(address _onwer) {
        uint256 tokenId = _patientByToken[_msgSender()];
        require(
            _onwer == _msgSender() || isApprovedOperator(_onwer, _msgSender()),
            "GEHR: operator is not approved"
        );
        _;
    }

    // functions

    function _payTransaction() internal {
        require(_msgSender() != address(0), "ERC20: owner need to be informed");
        if (_erc20Address != address(0)) {
            //require(_erc20Address != address(0), "ERC20: coin contract not setup");
            uint256 b = _gehrToken.balanceOf(_msgSender());
            require(b >= TOKEN_COST, "GEHR: transfer amount exceeds balance");
            _gehrToken.burnByContract(_msgSender(), TOKEN_COST);
        }
    }

    function approveOperator(address _operator) public {
        //_payTransaction();
        require(_msgSender() != address(0), "ERC20: owner need to be informed");
        require(_operator != address(0), "ERC20: operator need to be informed");
        uint256 _len = _operatorApprovalsIndex[_operator];
        _operatorApprovals[_operator][_len] = _msgSender();
        _operatorApprovalsIndex[_operator] = _len + 1;
        _patientApprovals[_msgSender()][_operator] = true;
    }

    /*
    function desapproveOperator(address _operator) public {
        //_payTransaction();
        require(_msgSender() != address(0), "ERC20: owner need to be informed");
        require(_operator != address(0), "ERC20: operator need to be informed");
        uint256 _len = _operatorApprovalsIndex[_operator];
        //_operatorApprovals[_operator]
        _operatorApprovals[_operator][_len] = _msgSender();
        _operatorApprovalsIndex[_operator] = _len + 1;
        _patientApprovals[_msgSender()][_operator] = true;
    }
    */

    function isApprovedOperator(
        address _owner,
        address _operator
    ) public view returns (bool) {
        require(_owner != address(0), "ERC20: owner need to be informed");
        require(_operator != address(0), "ERC20: owner need to be informed");
        return _patientApprovals[_owner][_operator];
    }

    function mint(string memory _name, string memory _email, uint64 _birthday, uint64 _tags) public {
        _payTransaction();
        uint256 tokenId = _patientByToken[_msgSender()];
        require(tokenId == 0, "ERC20: token already exists for this address");
        uint64 currentDate = uint64(block.timestamp);
        _allPatients.push(Patient({
            name: _name,
            email: _email,
            birthday: _birthday,
            addedAt: currentDate,
            lastChange: currentDate,
            tags: _tags,
            visible: false
        }));
        uint256 _newTokenId = _allPatients.length - 1;
        _patientByToken[_msgSender()] = _newTokenId;
        _mint(_msgSender(), _newTokenId);
        _totalSupply++;
        approveOperator(_msgSender());
    }

    function change(
        address _patient,
        string memory _name, 
        string memory _email, 
        uint64 _birthday, 
        uint64 _tags
    ) public onlyApproved(_patient) {
        _payTransaction();
        uint256 tokenId = _patientByToken[_patient];
        require(tokenId > 0 && tokenId < _allPatients.length, "ERC20: token not exists for this address");
        uint64 currentDate = uint64(block.timestamp);
        Patient storage p = _allPatients[tokenId];
        require(!p.visible, "ERC20: token is burned");
        p.name = _name;
        p.email = _email;
        p.birthday = _birthday;
        p.tags = _tags;
        p.lastChange = currentDate;
    }

    function burn() public {
        _payTransaction();
        uint256 tokenId = _patientByToken[_msgSender()];
        require(tokenId > 0 && tokenId < _allPatients.length, "ERC20: token not exists for this address");
        uint64 currentDate = uint64(block.timestamp);
        Patient storage p = _allPatients[tokenId];
        require(!p.visible, "ERC20: token is burned");
        p.name = "";
        p.email = "";
        p.birthday = 0;
        p.tags = 0;
        p.lastChange = currentDate;
        p.visible = false;
        delete _patientByToken[_msgSender()];
        _burn(tokenId);
        _totalSupply--;
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        _payTransaction();
        super._transfer(from, to, tokenId);
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function getOperatorBalance() public view returns (uint256) {
        return _operatorApprovalsIndex[_msgSender()];
    }

    function patientOfOperatorByIndex(
        uint256 index
    )
        public
        view
        returns (
            string memory name,
            string memory email,
            uint64 birthday,
            uint64 addedAt,
            uint64 lastChange,
            uint64 tags
        )
    {
        uint256 _length = _operatorApprovalsIndex[_msgSender()];
        require(index < _length, "GEHR: operator index out of bounds");
        address _patient = _operatorApprovals[_msgSender()][index];
        uint256 _token = _patientByToken[_patient];
        Patient storage p = _allPatients[_token];
        require(!p.visible, "ERC20: token is burned");

        name = p.name;
        email = p.email;
        birthday = p.birthday;
        addedAt = p.addedAt;
        lastChange = p.lastChange;
        tags = p.tags;
    }

    /*
    function getToken(uint256 _tokenId) public view returns (
            uint256 tokenId,
            string memory name,
            string memory email,
            uint64 birthday,
            uint64 addedAt,
            uint64 lastChange,
            uint64 tags
    ) {
        require(_tokenId > 0 && _tokenId < _allPatients.length, "GEHR: patient not exists");
        Patient storage p = _allPatients[_tokenId];

        tokenId = _tokenId;
        name = p.name;
        email = p.email;
        birthday = p.birthday;
        addedAt = p.addedAt;
        lastChange = p.lastChange;
        tags = p.tags;
    }
    */

    function patientByAddress(
        address _patient
    )
        public
        view
        onlyApproved(_patient)
        returns (
            uint256 tokenId,
            string memory name,
            string memory email,
            uint64 birthday,
            uint64 addedAt,
            uint64 lastChange,
            uint64 tags
        )
    {
        //console.log("patientAddress=%s", _patient);
        uint256 _tokenId = _patientByToken[_patient];
        //console.log("_tokenId=%s", _tokenId);
        require(_tokenId > 0, "GEHR: patient not exists");
        Patient storage p = _allPatients[_tokenId];
        require(!p.visible, "ERC20: token is burned");

        tokenId = _tokenId;
        name = p.name;
        email = p.email;
        birthday = p.birthday;
        addedAt = p.addedAt;
        lastChange = p.lastChange;
        tags = p.tags;
    }

    function getRecordPatientBalance(address _patient) public onlyApproved(_patient) view returns (uint256) {
        uint256 _tokenId = _patientByToken[_patient];
        return _patientRecordsIndex[_tokenId];
    }

    function recordPatientByIndex(
        address _patient,
        uint256 _index
    )
        public
        view
        onlyApproved(_patient)
        returns (
            uint256 tokenId,
            uint64 recordType,
            address operatorAddr,
            string memory operatorInfo,
            uint64 addedAt,
            uint64 agendaAt,
            string memory data
        )
    {
        uint256 _tokenId = _patientByToken[_patient];
        uint256 _length = _patientRecordsIndex[_tokenId];
        require(_index < _length, "GEHR: record index out of bounds");
        uint256 _recordIndex = _patientRecords[_tokenId][_index];
        Record storage r = _allRecords[_recordIndex];

        tokenId = r.patientToken;
        recordType = r.recordType;
        operatorAddr = r.operatorAddr;
        operatorInfo = r.operatorInfo;
        addedAt = r.addedAt;
        agendaAt = r.agendaAt;
        data = r.data;
    }

    function getRecordOperatorBalance() public view returns (uint256) {
        return _recordsByOperatorIndex[_msgSender()];
    }

    function recordOperatorByIndex(
        uint256 _index
    )
        public
        view
        returns (
            uint256 tokenId,
            uint64 recordType,
            address operatorAddr,
            string memory operatorInfo,
            uint64 addedAt,
            uint64 agendaAt,
            string memory data
        )
    {
        uint256 _length = _recordsByOperatorIndex[_msgSender()];
        require(_index < _length, "GEHR: record index out of bounds");
        uint256 _recordIndex = _recordsByOperator[_msgSender()][_index];
        Record storage r = _allRecords[_recordIndex];

        tokenId = r.patientToken;
        recordType = r.recordType;
        operatorAddr = r.operatorAddr;
        operatorInfo = r.operatorInfo;
        addedAt = r.addedAt;
        agendaAt = r.agendaAt;
        data = r.data;
    }

    function addRecord(
        address _owner,
        uint32 _recordType,
        uint64 _agendaAt,
        string memory _operatorInfo,
        string memory _data
    ) public onlyApproved(_owner) {
        uint256 _tokenId = _patientByToken[_owner];
        uint64 currentDate = uint64(block.timestamp); 
        _allRecords.push(Record({
            patientToken: _tokenId,
            recordType: _recordType,
            operatorAddr: _msgSender(),
            operatorInfo: _operatorInfo,
            addedAt: currentDate,
            agendaAt: _agendaAt,
            data: _data,
            visible: true
        }));
        uint256 _recordId = _allRecords.length - 1;

        uint256 _indexPatient = _patientRecordsIndex[_tokenId];
        _patientRecords[_tokenId][_indexPatient] = _recordId;
        _patientRecordsIndex[_tokenId]++;

        uint256 _indexByOperator = _recordsByOperatorIndex[_msgSender()];
        _recordsByOperator[_msgSender()][_indexByOperator] = _recordId;
        _recordsByOperatorIndex[_msgSender()]++;

        Patient storage p = _allPatients[_tokenId];
        p.lastChange = currentDate;
    }
}
