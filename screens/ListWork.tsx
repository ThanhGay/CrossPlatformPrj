import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import JobItem from './JobItem';

function ListWork({ navigation }: { navigation: any }) {
    const [refesh, setRefesh] = useState(false);
    const [listJob, setListJob] = useState<Array<any>>([]);
    useEffect(() => {
        setRefesh(true);
        axios
            .get(`http://kiemtra.stecom.vn:8888/api/cong-viec/PDT0220466/get-all`)
            .then(response => {
                setListJob(response.data.items);
            })
            .catch(err => console.log(err));
    }, [refesh]);

    const [name, setName] = useState('');
    const handleSearch = async (name: string) => {

        const searchRes = await axios.get(
            `http://kiemtra.stecom.vn:8888/api/cong-viec/PDT0220466/get-all?keyword=${name}`,
        );
        // console.log('searchRes', searchRes);

        if (searchRes.status === 200) {
            setListJob(searchRes.data.items);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View />
                <Text style={styles.text}>Danh sách công việc</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Add')}>
                    <Text style={{ ...styles.text, fontSize: 32 }}>+</Text>
                </TouchableOpacity>
            </View>

            {/* Search box */}
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchBox}
                    placeholder="Tìm kiếm..."
                    placeholderTextColor="#bbb"
                    defaultValue={name}
                    onChangeText={newText => setName(newText)}
                />
                <TouchableOpacity
                    style={styles.btnSearch}
                    onPress={() => handleSearch(name)}>
                    <Text style={{ ...styles.text, fontSize: 14 }}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>

            {/* Body */}
            <FlatList
                data={listJob}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Detail', { job: item })}>
                        <JobItem job={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                numColumns={1}
                style={{ marginTop: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    searchBox: {
        borderWidth: 1,
        width: '70%',
        height: 40,
        color: 'black',
        paddingLeft: 10,
    },
    btnSearch: {
        justifyContent: 'center',
        padding: 8,
        borderWidth: 1,
        height: 40,
    },
    text: {
        color: 'black',
        fontSize: 20,
    },
});

export default ListWork;
