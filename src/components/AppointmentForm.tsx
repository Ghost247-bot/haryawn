import { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0056b3;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SuccessMessage = styled.div`
  color: #28a745;
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const services = [
  'Corporate Law',
  'Litigation',
  'Intellectual Property',
  'Real Estate',
  'Employment Law',
  'Family Law',
  'Criminal Defense',
  'Immigration Law'
];

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  notes: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function AppointmentForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address';
    }
    
    if (!formData.date) {
      newErrors.date = 'Please select an appointment date';
    }
    
    if (!formData.time) {
      newErrors.time = 'Please select an appointment time';
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    // Validate that the appointment date is in the future
    const appointmentDate = new Date(formData.date + 'T' + formData.time);
    if (appointmentDate <= new Date()) {
      newErrors.date = 'Appointment must be scheduled for a future date and time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.join(', ') || 'Failed to book appointment');
      }

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to book appointment'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {isSuccess && (
        <SuccessMessage>
          Your appointment has been scheduled successfully! We'll send you a confirmation email shortly.
        </SuccessMessage>
      )}
      
      <div>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
      </div>

      <div>
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      </div>

      <div>
        <Input
          type="tel"
          name="phone"
          placeholder="Your Phone (optional)"
          value={formData.phone}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div>
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          disabled={isSubmitting}
          min={new Date().toISOString().split('T')[0]}
        />
        {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
      </div>

      <div>
        <Select
          name="time"
          value={formData.time}
          onChange={handleChange}
          disabled={isSubmitting}
        >
          <option value="">Select Time</option>
          {timeSlots.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </Select>
        {errors.time && <ErrorMessage>{errors.time}</ErrorMessage>}
      </div>

      <div>
        <Select
          name="service"
          value={formData.service}
          onChange={handleChange}
          disabled={isSubmitting}
        >
          <option value="">Select Service</option>
          {services.map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </Select>
        {errors.service && <ErrorMessage>{errors.service}</ErrorMessage>}
      </div>

      <div>
        <TextArea
          name="notes"
          placeholder="Additional Notes (optional)"
          value={formData.notes}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
      </Button>
    </Form>
  );
} 