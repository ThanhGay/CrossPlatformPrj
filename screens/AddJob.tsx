import axios from 'axios';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

function AddJob({ navigation }: { navigation: any }) {
    const [taxCode, setTaxCode] = useState('');
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [require, setRequire] = useState('');
    const [address, setAddress] = useState(' ');

    const createButtonAlert = () => {
        Alert.alert('Xác nhận', 'Bạn chắc chắn muốn hủy bỏ thêm công việc ?', [
            {
                text: 'Hủy',
                style: 'cancel',
            },
            {
                text: 'Xác nhận',
                onPress: () => navigation.navigate('All'),
            },
        ]);
    };

    // validate
    const [taxCodeValid, setTaxCodeValid] = useState(false);
    const [nameValid, setNameValid] = useState(false);
    const [positionValid, setPositionValid] = useState(false);
    const [requireValid, setRequireValid] = useState(false);

    const validateTaxCode = (str: string) => {
        setTaxCodeValid(str.length >= 20);
    };
    const validateName = (str: string) => {
        setNameValid(str.length >= 30);
    };
    const validatePosition = (str: string) => {
        setPositionValid(str.length >= 10);
    };
    const validateRequire = (str: string) => {
        setRequireValid(!!str.length);
    };

    const handleSubmit = async () => {
        validateTaxCode(taxCode.trim());
        validateName(name.trim());
        validatePosition(position.trim());
        validateRequire(require.trim());

        if (taxCodeValid && nameValid && positionValid && requireValid) {
            const postData = JSON.stringify({
                maSoThue: taxCode.trim(),
                tenCongTy: name.trim(),
                viTriTuyenDung: position.trim(),
                yeuCauTuyenDung: require.trim(),
                diaChi: address,
            });
            const dataRes = await axios.post(
                'http://kiemtra.stecom.vn:8888/api/cong-viec/PDT0220466/create',
                postData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            if (dataRes.status === 200) {
                navigation.navigate('All');
            }
        } else {
            Alert.alert(
                'Có gì đó sai sai',
                '- Mã số thuế tối thiểu 20 ký tự\n- Tên công ty tối thiểu 30 ký tự.\n- Vị trí tuyển dụng tối thiểu 10 ký tự.\n- Yêu cầu tuyển dụng không được để trống.',
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* header */}
                <TouchableOpacity onPress={() => navigation.navigate('All')}>
                    <FontAwesomeIcon icon={faArrowLeft} size={24} />
                </TouchableOpacity>
                <Text style={styles.title}>Thêm công việc</Text>
                <View />
            </View>

            {/* Content */}
            <ScrollView>
                <View>
                    <View style={styles.boxValue}>
                        <Text style={styles.label}>Mã số thuế</Text>
                        <TextInput
                            value={taxCode}
                            onChangeText={newText => {
                                setTaxCode(newText);
                                validateTaxCode(newText.trim());
                            }}
                            placeholder="Nhập mã số thuế"
                            placeholderTextColor="#bbb"
                            style={styles.textValue}
                        />
                    </View>
                    <View style={styles.boxValue}>
                        <Text style={styles.label}>Tên công ty</Text>
                        <TextInput
                            value={name}
                            onChangeText={newText => {
                                setName(newText);
                                validateName(newText.trim());
                            }}
                            placeholder="Nhập tên công ty"
                            placeholderTextColor="#bbb"
                            style={styles.textValue}
                        />
                    </View>
                    <View style={styles.boxValue}>
                        <Text style={styles.label}>Vị trí tuyển dụng</Text>
                        <TextInput
                            value={position}
                            onChangeText={newText => {
                                setPosition(newText);
                                validatePosition(newText.trim());
                            }}
                            placeholder="Nhập vị trí tuyển dụng"
                            placeholderTextColor="#bbb"
                            style={styles.textValue}
                        />
                    </View>
                    <View style={styles.boxValue}>
                        <Text style={styles.label}>Yêu cầu tuyển dụng</Text>
                        <TextInput
                            value={require}
                            onChangeText={newText => {
                                setRequire(newText);
                                validateRequire(newText.trim());
                            }}
                            multiline
                            numberOfLines={4}
                            style={styles.textValue}
                        />
                    </View>

                    <View style={styles.boxValue}>
                        <Text style={styles.label}>Địa chỉ</Text>
                        <TextInput
                            value={address}
                            onChangeText={newText => {
                                setAddress(newText);
                            }}
                            multiline
                            numberOfLines={3}
                            style={styles.textValue}
                        />
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.btn} onPress={createButtonAlert}>
                        <Text style={{ color: 'black' }}>Hủy bỏ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                        <Text style={{ color: 'black' }}>Lưu lại</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        marginBottom: 8,
    },
    title: {
        color: 'black',
        fontSize: 20,
    },
    boxValue: {
        marginVertical: 8,
    },
    label: {
        color: 'black',
        fontSize: 18,
        fontWeight: '600',
        paddingBottom: 4,
    },
    textValue: {
        color: 'black',
        fontSize: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: 'black',
    },
    btn: {
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'black',
        shadowOpacity: 40,
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default AddJob;
