import Link from "next/link";
import AppButtonSm from "../buttons/AppButtonSm";
import { slsFetch } from "@klaudsol/commons/lib/Client";
import { BiCheck, BiX } from "react-icons/bi";

const BASE_URL = '/api/admin/users';

const UsersTable = ({ users, setUsers, isLoading, setLoading, token }) => {
    const setUserList = (id) => {
        const newUserList = users.filter((user) => user.id !== id);
        setUsers(newUserList);
    }

    const approveUser = async (id) => {
        try {
            setLoading(true);

            const params = {
                method: 'PUT',
                body: JSON.stringify({ id }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await slsFetch(BASE_URL, params);

            setUserList(id);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const rejectUser = async (id) => {
        try {
            setLoading(true);

            const params = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            await slsFetch(`${BASE_URL}?id=${id}`, params);

            setUserList(id);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="table_general_main">
            <table id="table_general">
                {/*table head*/}
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Created At </th>
                        <th> Approve / Reject </th>
                    </tr>
                </thead>
                {/*table body*/}
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="table--expand_cell">{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.createdAt}</td>
                            <td className="table--shrink_cell">
                                <AppButtonSm
                                    className="users__pending_button users__pending_button--approve"
                                    icon={<BiCheck />}
                                    onClick={() => approveUser(user.id)}
                                    isDisabled={isLoading}
                                />
                                <AppButtonSm
                                    className="users__pending_button users__pending_button--reject"
                                    icon={<BiX />}
                                    onClick={() => rejectUser(user.id)}
                                    isDisabled={isLoading}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
