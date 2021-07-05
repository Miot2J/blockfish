package com.project.blockfish.file.service.klay;

import com.klaytn.caver.Caver;
import com.klaytn.caver.abi.ABI;
import com.klaytn.caver.contract.Contract;
import com.klaytn.caver.contract.SendOptions;
import com.klaytn.caver.methods.response.Bytes32;
import com.klaytn.caver.methods.response.TransactionReceipt;
import com.klaytn.caver.transaction.type.ValueTransfer;
import com.klaytn.caver.wallet.keyring.KeyringFactory;
import com.klaytn.caver.wallet.keyring.SingleKeyring;
import com.project.blockfish.dto.KlayDto;
import org.springframework.stereotype.Service;
import org.web3j.abi.datatypes.Type;
import org.web3j.crypto.CipherException;
import org.web3j.protocol.exceptions.TransactionException;


import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.math.BigInteger;
import java.util.List;

@Service
public class KlayService {
    public static String MAINNET_URL = "https://api.cypress.klaytn.net:8651";
    public static String BAOBAB_URL = "https://api.baobab.klaytn.net:8651";

    public static final String byteCode = "608060405234801561001057600080fd5b506104e5806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632ebcb65314610046578063d13319c4146100c9578063e15fe0231461014c575b600080fd5b61004e61029e565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561008e578082015181840152602081019050610073565b50505050905090810190601f1680156100bb5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100d1610340565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101115780820151818401526020810190506100f6565b50505050905090810190601f16801561013e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61029c6004803603604081101561016257600080fd5b810190808035906020019064010000000081111561017f57600080fd5b82018360208201111561019157600080fd5b803590602001918460018302840111640100000000831117156101b357600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561021657600080fd5b82018360208201111561022857600080fd5b8035906020019184600183028401116401000000008311171561024a57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103e2565b005b606060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103365780601f1061030b57610100808354040283529160200191610336565b820191906000526020600020905b81548152906001019060200180831161031957829003601f168201915b5050505050905090565b606060018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103d85780601f106103ad576101008083540402835291602001916103d8565b820191906000526020600020905b8154815290600101906020018083116103bb57829003601f168201915b5050505050905090565b81600090805190602001906103f8929190610414565b50806001908051906020019061040f929190610414565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061045557805160ff1916838001178555610483565b82800160010185558215610483579182015b82811115610482578251825591602001919060010190610467565b5b5090506104909190610494565b5090565b6104b691905b808211156104b257600081600090555060010161049a565b5090565b9056fea165627a7a72305820d70e5e95d8329794cebc353ba950309ff4338a23d8d7296b7ec8b2572087d6e20029";
    public static final String ABIJson = "[\n" +
            "\t{\n" +
            "\t\t\"constant\": true,\n" +
            "\t\t\"inputs\": [],\n" +
            "\t\t\"name\": \"getUserId\",\n" +
            "\t\t\"outputs\": [\n" +
            "\t\t\t{\n" +
            "\t\t\t\t\"name\": \"\",\n" +
            "\t\t\t\t\"type\": \"string\"\n" +
            "\t\t\t}\n" +
            "\t\t],\n" +
            "\t\t\"payable\": false,\n" +
            "\t\t\"stateMutability\": \"view\",\n" +
            "\t\t\"type\": \"function\"\n" +
            "\t},\n" +
            "\t{\n" +
            "\t\t\"constant\": true,\n" +
            "\t\t\"inputs\": [],\n" +
            "\t\t\"name\": \"getHash\",\n" +
            "\t\t\"outputs\": [\n" +
            "\t\t\t{\n" +
            "\t\t\t\t\"name\": \"\",\n" +
            "\t\t\t\t\"type\": \"string\"\n" +
            "\t\t\t}\n" +
            "\t\t],\n" +
            "\t\t\"payable\": false,\n" +
            "\t\t\"stateMutability\": \"view\",\n" +
            "\t\t\"type\": \"function\"\n" +
            "\t},\n" +
            "\t{\n" +
            "\t\t\"constant\": false,\n" +
            "\t\t\"inputs\": [\n" +
            "\t\t\t{\n" +
            "\t\t\t\t\"name\": \"id\",\n" +
            "\t\t\t\t\"type\": \"string\"\n" +
            "\t\t\t},\n" +
            "\t\t\t{\n" +
            "\t\t\t\t\"name\": \"hash\",\n" +
            "\t\t\t\t\"type\": \"string\"\n" +
            "\t\t\t}\n" +
            "\t\t],\n" +
            "\t\t\"name\": \"setHash\",\n" +
            "\t\t\"outputs\": [],\n" +
            "\t\t\"payable\": false,\n" +
            "\t\t\"stateMutability\": \"nonpayable\",\n" +
            "\t\t\"type\": \"function\"\n" +
            "\t}\n" +
            "]";

    private String sendingKLAY() throws IOException, CipherException {
        Caver caver = new Caver(BAOBAB_URL);
//        File file = new File("/Users/minho/Downloads/keystore.json");
//
//        //Decrypt keystore.
//        ObjectMapper objectMapper = ObjectMapperFactory.getObjectMapper();
//        KeyStore keyStore = objectMapper.readValue(file, KeyStore.class);
//        AbstractKeyring keyring = KeyringFactory.decrypt(keyStore, "Alsgh3144!");

//        BigInteger value = new BigInteger(Utils.convertToPeb(BigDecimal.ONE, "KLAY"));

        // Add a keyring to caver.wallet
        SingleKeyring keyring = KeyringFactory.createFromPrivateKey("0x5d6342b9903f624d1d34eb81c21b44f87e97a70b7e3ed41de0ffa06c3b22db41");
        caver.wallet.add(keyring);
        BigInteger value = BigInteger.valueOf(1);

        //Create a value transfer transaction
        ValueTransfer valueTransfer = new ValueTransfer.Builder()
                .setKlaytnCall(caver.rpc.getKlay())
                .setFrom(keyring.getAddress())
                .setTo("0x611b2c191d0028ae88a919ab1113c3f389312d38")
                .setValue(value)
                .setGas(BigInteger.valueOf(25000))
                .build();

        // Sign the transaction via caver.wallet.sign
        caver.wallet.sign(keyring.getAddress(), valueTransfer);
        String rlpEncoded = valueTransfer.getRLPEncoding();
        // RLP 인코딩된 트랜잭션 문자열
        System.out.println("RLP-encoded string: " + rlpEncoded);
        return rlpEncoded;
    }

    private String sendRawTransaction(String rlpEncoded) {
        Caver caver = new Caver(BAOBAB_URL);

        String txHash = null;

        try {
            // Send the transaction using `caver.rpc.klay.sendRawTransaction`.
            Bytes32 sendResult = caver.rpc.klay.sendRawTransaction(rlpEncoded).send();
            if(sendResult.hasError()) {
                System.out.println("Error");
            }

            txHash = sendResult.getResult();
        } catch (IOException e) {
            // do something to handle exception
        }
        return txHash;

   }

    private void loadContract(String contractAddress) {
        Caver caver = new Caver(BAOBAB_URL);
        try {
            Contract contract = new Contract(caver, ABIJson, contractAddress);

            contract.getMethods().forEach((name, method) ->{
                System.out.println(method.getType() + " " +  ABI.buildFunctionString(method));
            });

            System.out.println("ContractAddress : " + contract.getContractAddress());
        } catch (IOException e) {
            //handle exception..
        }
    }

    private String deployContract() {
        Caver caver = new Caver(BAOBAB_URL);
        SingleKeyring deployer = KeyringFactory.createFromPrivateKey("0x5d6342b9903f624d1d34eb81c21b44f87e97a70b7e3ed41de0ffa06c3b22db41");
        caver.wallet.add(deployer);

        try {
            Contract contract = new Contract(caver, ABIJson);
            SendOptions sendOptions = new SendOptions();
            sendOptions.setFrom(deployer.getAddress());
            sendOptions.setGas(BigInteger.valueOf(4000000));

            Contract newContract = contract.deploy(sendOptions, byteCode);
            System.out.println("Contract address : " + newContract.getContractAddress());

            return newContract.getContractAddress();
        } catch (IOException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException | TransactionException e) {
            return "fail";
        }

    }

    private void executeContractWithFeeDelegation(String contractAddress, String userId, String fileHash) {
        Caver caver = new Caver(BAOBAB_URL);
        SingleKeyring executor = KeyringFactory.createFromPrivateKey("0x5d6342b9903f624d1d34eb81c21b44f87e97a70b7e3ed41de0ffa06c3b22db41");
        caver.wallet.add(executor);

        try {
            Contract contract = new Contract(caver, ABIJson, contractAddress);
            SendOptions sendOptions = new SendOptions();
            sendOptions.setFrom(executor.getAddress());
            sendOptions.setGas(BigInteger.valueOf(4000000));

            TransactionReceipt.TransactionReceiptData receipt = contract.send(sendOptions, "setHash",  fileHash, userId);
        } catch (IOException | TransactionException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            //handle exception..
        }
    }

    private KlayDto callContractFunction(String contractAddress) {
        Caver caver = new Caver(BAOBAB_URL);
        KlayDto klayDto = new KlayDto();

        try {
            Contract contract = new Contract(caver, ABIJson, contractAddress);
            List<Type> userId = contract.call("getUserId");
            List<Type> hash = contract.call("getHash");
            System.out.println((String) userId.get(0).getValue());
            System.out.println((String) hash.get(0).getValue());
            klayDto.setUserId((String) userId.get(0).getValue());
            klayDto.setHash((String) hash.get(0).getValue());
            klayDto.setContractAddress(contractAddress);
        } catch (IOException | ClassNotFoundException | NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            //handle exception..
        }
        return klayDto;
    }

    public KlayDto sendHashToKlay(String fileHash, String userId) {
        KlayService klayService = new KlayService();
        String contractAddress = klayService.deployContract();
        klayService.loadContract(contractAddress);
        klayService.executeContractWithFeeDelegation(contractAddress, fileHash, userId);
        KlayDto klayDto = klayService.callContractFunction(contractAddress);
        return klayDto;
    }



//    public static void main(String[] args) throws IOException, CipherException {
//        KlayService klayService = new KlayService();
//        String contractAddress = klayService.deployContract();
//        klayService.loadContract(contractAddress);
//        klayService.executeContractWithFeeDelegation(contractAddress);
//        klayService.callContractFunction(contractAddress);
//    }
}
