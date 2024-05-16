import { StyleSheet, Text, View } from 'react-native';

function StudentItem({ student }: { student: any }) {
    return (
        <View style={styles.container}>
            <Text style={{ color: 'black', fontWeight: '700' }}>
                {student.name}
            </Text>
            <Text style={{ color: 'black' }}>
                MSSV:{' '}
                <Text style={{ fontWeight: '700' }}>{student.studentCode}</Text>
            </Text>
            <Text style={{ color: 'black' }}>
                Date of birth:{' '}
                <Text style={{ fontWeight: '700' }}>
                    {student.dateOfBirth.split('T')[0]}
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'pink',
        paddingBottom: 18,
        // paddingHorizontal: 8,
        marginHorizontal: 12,
        marginVertical: 12,
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
});

export default StudentItem;
