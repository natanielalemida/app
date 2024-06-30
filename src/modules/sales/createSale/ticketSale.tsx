import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useRoute} from '@react-navigation/native';
import {openUrl} from '../../../api/apiInstance';

export default function TicketSale({navigation}) {
  const route = useRoute();
  const params = route.params || {};
  const {products, user, soldBy, amount, saleId} = params;

  console.log(amount)

  const [modalVisible, setModalVisible] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleMountBody = async (saleTypeId: number) => {
    try {
      const {status} = await openUrl({
        method: 'post',
        endpoint: 'sale',
        data: {
          products: products,
          organizationId: params.organizationId,
          saleTypeId,
          soldBy: soldBy ? soldBy.userId : undefined,
          amount: amount,
          createdAt: new Date(),
        },
      });

      if (!status) throw new Error('cannot get organization');
    } catch {
      console.log('erro');
    }
  };

  const handleAddUser = () => {
    if (saleId) return;
    setModalVisible(true);
  };

  const handleOptionSelect = async (option: number) => {
    await handleMountBody(option);
    setModalVisible(false);
    navigation.pop(4);
  };

  return (
    <View style={styles.container}>
      <View style={styles.initialContainer}>
        <View>
          <Icon
            onPress={handleGoBack}
            name="arrow-left"
            size={25}
            color="#fff"
          />
        </View>
        <Text style={styles.initialText}>Vendas</Text>
        <View>
          <Icon
            onPress={handleAddUser}
            name="check-circle"
            size={25}
            color="#fff"
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView>
          <View>
            <Text style={styles.textTickt}>Empresa: Hiper Veja</Text>
          </View>
          <View>
            <Text style={styles.textTickt}>Vendedor: {soldBy.name}</Text>
          </View>
          <View>
            <Text style={styles.textTickt}>
              Cliente: {user ? user.userName : 'Cliente não informado'}
            </Text>
          </View>
          <View>
            <Text style={styles.textTickt}>Produtos: </Text>
            <View>
              {products.map(produto => (
                <View
                  key={produto.productId}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.textTickt}>{produto.productName}</Text>
                  <Text style={styles.textTickt}>
                    R$ {produto.productPrice.toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        <View>
          <Text style={styles.totalTicked}>
            Total R$ {Number(amount).toFixed(2)}
          </Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Selecione uma opção de pagamento:
            </Text>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect(4)}>
              <Text style={styles.optionText}>Dinheiro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect(2)}>
              <Text style={styles.optionText}>Cartão Débito</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect(3)}>
              <Text style={styles.optionText}>Cartão Crédito</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionSelect(1)}>
              <Text style={styles.optionText}>Fiado</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.optionText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#D3D3D3', alignItems: 'center'},
  initialContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#084D6E',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  initialText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 22,
  },
  textTickt: {
    color: 'black',
    fontSize: 18,
  },
  totalTicked: {
    color: 'red',
    fontSize: 18,
  },
  iconContainer: {
    width: '40%',
  },
  label: {
    width: '95%',
    height: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    margin: 11,
    paddingLeft: 10,
    borderRadius: 5,
  },
  contentContainer: {
    height: '85%',
    width: '90%',
    backgroundColor: '#dddd62',
    margin: 15,
    padding: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  optionButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
  },
  optionText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#f44336',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
});
